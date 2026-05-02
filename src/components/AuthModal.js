'use client';
import { useState } from 'react';
import useAuthStore from '@/store/authStore';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuth, authMode, setAuthMode, login, register, authMessage } = useAuthStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (authMode === 'register') {
        await register({ name, phone, address, email, password });
      } else {
        await login(email, password);
      }
      setName('');
      setPhone('');
      setAddress('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setError('');
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeAuth} />

      <div className="relative nm-raised-lg w-full max-w-sm p-8 animate-zoom-in">
        {/* Close */}
        <button onClick={closeAuth} className="absolute top-4 right-4 nm-btn w-8 h-8 flex items-center justify-center text-[var(--nm-text-secondary)]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="nm-raised-sm w-14 h-14 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-7 h-7 text-[var(--nm-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[var(--nm-text)]">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-[var(--nm-text-secondary)] mt-1">
            {authMode === 'login' ? 'Sign in to continue' : 'Register to get started'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-[var(--nm-text-secondary)] uppercase tracking-wider block mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="nm-input w-full text-sm"
                placeholder="Your full name"
              />
            </div>
          )}

          {authMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-[var(--nm-text-secondary)] uppercase tracking-wider block mb-1.5">Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="nm-input w-full text-sm"
                placeholder="e.g. +92 3xx xxx xxxx"
              />
            </div>
          )}

          {authMode === 'register' && (
            <div>
              <label className="text-xs font-bold text-[var(--nm-text-secondary)] uppercase tracking-wider block mb-1.5">Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="nm-input w-full text-sm"
                placeholder="Street, City"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-[var(--nm-text-secondary)] uppercase tracking-wider block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="nm-input w-full text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--nm-text-secondary)] uppercase tracking-wider block mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="nm-input w-full text-sm"
              placeholder="Min 8 characters"
              minLength={8}
            />
          </div>

          {authMessage && (
            <div className="nm-inset-sm p-3 text-sm text-[var(--nm-success)] font-medium text-center">
              {authMessage}
            </div>
          )}

          {error && (
            <div className="nm-inset-sm p-3 text-sm text-[var(--nm-danger)] font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="nm-btn-accent w-full py-3 text-sm disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Switch mode */}
        <div className="text-center mt-5">
          <p className="text-sm text-[var(--nm-text-secondary)]">
            {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={switchMode} className="text-[var(--nm-accent)] font-semibold ml-1 hover:underline">
              {authMode === 'login' ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
