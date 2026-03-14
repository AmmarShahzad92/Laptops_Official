import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { memRegister, hashPassword } from '@/lib/memStore';

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

      const { data: user, error } = await supabase
        .from('users')
        .insert({ username, email, password_hash: passwordHash })
        .select('id, username, email, created_at')
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

      return NextResponse.json({ user }, { status: 201 });
    }

    // ── In-memory fallback ───────────────────────────────────────────────────
    const user = await memRegister(username, email, password);
    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.status ?? 500 });
  }
}
