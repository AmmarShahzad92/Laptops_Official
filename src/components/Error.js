export default function Error({ error }) {
  return (
    <div className="min-h-screen bg-[var(--nm-bg)] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="nm-raised w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <svg className="w-10 h-10 text-[var(--nm-danger)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[var(--nm-text)] mb-4">Something went wrong</h2>
        <p className="text-[var(--nm-text-secondary)] mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="nm-btn-accent px-8 py-3 text-sm">
          Try Again
        </button>
      </div>
    </div>
  );
}
