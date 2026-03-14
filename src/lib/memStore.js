/**
 * In-memory user store — active when Supabase is not configured.
 * Data lives in the Node.js server process; resets on server restart.
 * Swap for Supabase once keys are set in .env.local
 */

/** @type {Map<string, {id: string, username: string, email: string, passwordHash: string, createdAt: string}>} */
const users = new Map(); // keyed by email

export async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function memRegister(username, email, password) {
  if (users.has(email)) {
    throw Object.assign(new Error('Email already registered'), { status: 409 });
  }
  const passwordHash = await hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    username,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.set(email, user);
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

export async function memLogin(email, password) {
  const user = users.get(email);
  if (!user) throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  const hash = await hashPassword(password);
  if (hash !== user.passwordHash) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  }
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}
