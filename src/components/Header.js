'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import useAuthStore from '@/store/authStore';
import useThemeStore from '@/store/themeStore';

export default function Header({ searchTerm, setSearchTerm, brands, onBrandSelect }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef(null);
  const mobileRef = useRef(null);
  const userMenuRef = useRef(null);
  const { totalItems, setIsOpen } = useCart();
  const { user, profile, openAuth, logout, initAuth } = useAuthStore();
  const { theme, toggle } = useThemeStore();

  useEffect(() => {
    initAuth();
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target)) setShowMobileMenu(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [initAuth]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const scrollToProducts = () => {
    const el = document.getElementById('products-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBrandClick = (brand) => {
    onBrandSelect(brand);
    setShowDropdown(false);
    setShowMobileMenu(false);
    setTimeout(scrollToProducts, 100);
  };

  const scrollToContact = () => {
    const el = document.querySelector('footer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const displayName =
    profile?.name ||
    user?.user_metadata?.name ||
    (user?.email ? String(user.email).split('@')[0] : 'User');

  const displayEmail = profile?.email || user?.email || '';

  return (
    <header className="sticky top-0 z-40 bg-[var(--nm-bg)]" style={{ boxShadow: '0 4px 12px var(--nm-shadow-dark)' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center h-16 md:h-20 gap-3 md:gap-5">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <div className="nm-raised-sm w-9 h-9 md:w-11 md:h-11 flex items-center justify-center">
              {/* svg element for logo */}
              {/* <svg className="w-5 h-5 md:w-6 md:h-6 text-[var(--nm-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg> */}

              <Image
                src="/Images/web icon.svg"
                alt="Laptops Official logo"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base md:text-xl font-bold text-[var(--nm-text)] leading-tight">Laptops Official</h1>
              <p className="text-[10px] md:text-xs text-[var(--nm-text-secondary)] leading-tight">Know it.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test it.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Own it.</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-3">
            <div ref={dropdownRef} className="relative">
              <button
                onMouseEnter={() => setShowDropdown(true)}
                onClick={() => setShowDropdown(!showDropdown)}
                className={`nm-btn px-4 py-2 text-sm flex items-center gap-1.5 ${showDropdown ? 'active' : ''}`}
              >
                Categories
                <svg className={`w-3.5 h-3.5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDropdown && (
                <div
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                  className="absolute top-full left-0 mt-2 nm-dropdown p-3 min-w-[200px] animate-slide-down z-50"
                >
                  <p className="text-xs font-bold text-[var(--nm-text-secondary)] uppercase tracking-wider mb-2 px-2">Brands</p>
                  {brands?.map(brand => (
                    <button key={brand} onClick={() => handleBrandClick(brand)} className="w-full text-left px-3 py-2 text-sm font-medium text-[var(--nm-text)] hover:text-[var(--nm-accent)] rounded-lg transition-all hover:bg-[var(--nm-shadow-light)]">
                      {brand}
                    </button>
                  ))}
                  <div className="border-t border-[var(--nm-shadow-dark)]/20 mt-2 pt-2">
                    <button onClick={() => handleBrandClick('')} className="w-full text-left px-3 py-2 text-sm font-medium text-[var(--nm-accent)] rounded-lg transition-all hover:bg-[var(--nm-shadow-light)]">
                      All Brands
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={scrollToContact} className="nm-btn px-4 py-2 text-sm">Contact</button>
          </nav>

          {/* Search - properly spaced with no icon overlap */}
          <div className="flex-1 min-w-0 mx-2">
            <div className="relative max-w-lg mx-auto">
              {/* commented svg for search */}
              {/* <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--nm-shadow-dark)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg> */}
              <input
                type="text"
                placeholder="Search laptops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={scrollToProducts}
                className="nm-input w-full pl-11 pr-4 py-2 md:py-2.5 text-sm"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Theme toggle */}
            <button onClick={toggle} className="nm-circle w-9 h-9 md:w-10 md:h-10 flex items-center justify-center" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? (
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[var(--nm-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[var(--nm-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Cart */}
            <button onClick={() => setIsOpen(true)} className="nm-circle w-9 h-9 md:w-10 md:h-10 flex items-center justify-center relative">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-[var(--nm-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--nm-accent)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth — user dropdown or sign-in button */}
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`nm-btn px-3 py-1.5 md:px-3.5 md:py-2 text-xs md:text-sm flex items-center gap-1.5 ${showUserMenu ? 'active' : ''}`}
                >
                  {/* User avatar circle */}
                  <span className="w-5 h-5 rounded-full bg-[var(--nm-accent)] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {displayName?.[0]?.toUpperCase() || 'U'}
                  </span>
                  <span className="hidden md:inline max-w-[72px] truncate font-semibold">{displayName}</span>
                  <svg className={`w-3 h-3 text-[var(--nm-text-secondary)] transition-transform hidden md:block ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 nm-dropdown p-3 w-52 animate-slide-down z-50">
                    {/* User info */}
                    <div className="px-3 py-2 mb-2 nm-inset-sm">
                      <p className="text-xs font-bold text-[var(--nm-text)] truncate">{displayName}</p>
                      <p className="text-[10px] text-[var(--nm-text-secondary)] truncate mt-0.5">{displayEmail}</p>
                    </div>
                    {/* Sign out */}
                    <button
                      onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full text-left px-3 py-2 text-sm font-semibold text-[var(--nm-danger)] rounded-lg hover:bg-[var(--nm-shadow-light)] flex items-center gap-2 transition-colors"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => openAuth('login')} className="nm-btn px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden md:inline">Sign In</span>
              </button>
            )}

            {/* Mobile hamburger */}
            <div className="lg:hidden relative" ref={mobileRef}>
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="nm-btn w-9 h-9 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--nm-text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {showMobileMenu && (
                <div className="absolute top-full right-0 mt-2 nm-dropdown p-3 min-w-[220px] animate-slide-down z-50">
                  <p className="text-xs font-bold text-[var(--nm-text-secondary)] uppercase tracking-wider mt-2 mb-1 px-2">Brands</p>
                  {brands?.map(brand => (
                    <button key={brand} onClick={() => handleBrandClick(brand)} className="w-full text-left px-3 py-2 text-sm font-medium text-[var(--nm-text)] hover:text-[var(--nm-accent)] rounded-lg hover:bg-[var(--nm-shadow-light)]">
                      {brand}
                    </button>
                  ))}
                  <button onClick={() => handleBrandClick('')} className="w-full text-left px-3 py-2 text-sm font-medium text-[var(--nm-accent)] rounded-lg hover:bg-[var(--nm-shadow-light)]">All Brands</button>
                  <div className="border-t border-[var(--nm-shadow-dark)]/20 mt-2 pt-2">
                    <button onClick={() => { scrollToContact(); setShowMobileMenu(false); }} className="w-full text-left px-3 py-2.5 text-sm font-medium text-[var(--nm-text)] rounded-lg hover:bg-[var(--nm-shadow-light)]">Contact</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
