import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { memLogin, hashPassword } from '@/lib/memStore';

function isMissingUsernameColumn(error) {
  return (
    error &&
    typeof error.message === 'string' &&
    error.message.includes("Could not find the 'username' column")
  );
}

function normalizeUser(user) {
  if (!user) return user;
  return {
    ...user,
    username: user.username || (user.email ? String(user.email).split('@')[0] : null),
  };
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'email and password are required' }, { status: 400 });
    }

    // Supabase path
    if (supabase) {
      const passwordHash = await hashPassword(password);

      const { data: userWithUsername, error } = await supabase
        .from('users')
        .select('id, username, email, created_at')
        .eq('email', email)
        .eq('password_hash', passwordHash)
        .single();

      if (!error && userWithUsername) {
        return NextResponse.json({ user: normalizeUser(userWithUsername) });
      }

      if (!isMissingUsernameColumn(error)) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      // Backward compatibility for older `users` tables that don't include username.
      const { data: userLegacy, error: legacyError } = await supabase
        .from('users')
        .select('id, email, created_at')
        .eq('email', email)
        .eq('password_hash', passwordHash)
        .single();

      if (legacyError || !userLegacy) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      return NextResponse.json({ user: normalizeUser(userLegacy) });
    }

    // In-memory fallback (dev mode — no Supabase keys yet)
    const user = await memLogin(email, password);
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.status ?? 500 });
  }
}
