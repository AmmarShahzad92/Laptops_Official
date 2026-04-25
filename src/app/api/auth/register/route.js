import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { memRegister, hashPassword } from '@/lib/memStore';

function isMissingUsernameColumn(error) {
  return (
    error &&
    typeof error.message === 'string' &&
    error.message.includes("Could not find the 'username' column")
  );
}

function normalizeUser(user, fallbackUsername = null) {
  if (!user) return user;
  return {
    ...user,
    username:
      user.username ||
      fallbackUsername ||
      (user.email ? String(user.email).split('@')[0] : null),
  };
}

/**
 * POST /api/auth/register
 *
 * Storage behaviour:
 *   • NEXT_PUBLIC_SUPABASE_URL set  → stores { username, email, password_hash } in the
 *     Supabase `users` table (see supabase/schema.sql for table definition).
 *   • No Supabase keys             → stores the same fields in the in-memory Map
 *     (src/lib/memStore.js).  Data persists until the dev server restarts.
 *
 * The password is never stored in plain text — it is SHA-256 hashed via
 * the Web Crypto API before being persisted.
 */
export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'username, email, and password are required' },
        { status: 400 }
      );
    }

    // ── Supabase path ────────────────────────────────────────────────────────
    if (supabase) {
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (existing) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
      }

      const passwordHash = await hashPassword(password);

      const { data: userWithUsername, error: insertError } = await supabase
        .from('users')
        .insert({ username, email, password_hash: passwordHash })
        .select('id, username, email, created_at')
        .single();

      if (!insertError) {
        return NextResponse.json({ user: normalizeUser(userWithUsername, username) }, { status: 201 });
      }

      // Backward compatibility for older tables that were created without `username`.
      if (!isMissingUsernameColumn(insertError)) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }

      const { data: userLegacy, error: legacyError } = await supabase
        .from('users')
        .insert({ email, password_hash: passwordHash })
        .select('id, email, created_at')
        .single();

      if (legacyError) {
        return NextResponse.json(
          {
            error:
              `${legacyError.message}. Run this SQL in Supabase: ` +
              `ALTER TABLE public.users ADD COLUMN IF NOT EXISTS username text;`,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({ user: normalizeUser(userLegacy, username) }, { status: 201 });
    }

    // ── In-memory fallback ───────────────────────────────────────────────────
    const user = await memRegister(username, email, password);
    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.status ?? 500 });
  }
}
