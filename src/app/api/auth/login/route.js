import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { memLogin, hashPassword } from '@/lib/memStore';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'email and password are required' }, { status: 400 });
    }

    // Supabase path
    if (supabase) {
      const passwordHash = await hashPassword(password);

      const { data: user, error } = await supabase
        .from('users')
        .select('id, username, email, created_at')
        .eq('email', email)
        .eq('password_hash', passwordHash)
        .single();

      if (error || !user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      return NextResponse.json({ user });
    }

    // In-memory fallback (dev mode — no Supabase keys yet)
    const user = await memLogin(email, password);
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.status ?? 500 });
  }
}
