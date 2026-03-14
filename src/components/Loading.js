export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--nm-bg)] flex items-center justify-center">
      <div className="text-center">
        <div className="nm-raised w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-[var(--nm-accent)] border-t-transparent rounded-full" style={{ animation: 'spin 0.8s linear infinite' }} />
        </div>
        <p className="text-lg text-[var(--nm-text-secondary)] font-medium">Loading premium laptops...</p>
      </div>
      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
