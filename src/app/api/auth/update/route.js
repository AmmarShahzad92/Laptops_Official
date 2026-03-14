import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(request) {
  try {
    const { userId, email, password } = await request.json();

    if (!userId || (!email && !password)) {
      return NextResponse.json({ error: 'userId and at least one of email/password required' }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const updates = {};

    if (email) {
      updates.email = email;
    }

    if (password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      updates.password_hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select('id, username, email, updated_at')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
