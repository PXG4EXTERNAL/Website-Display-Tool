import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import defaultLogo from '@assets/image_1783159506476.png';
import { useAdmin } from '@/contexts/admin-context';
import { useLocalStorage } from '@/hooks/use-local-storage';

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openAdmin, isAdmin, setIsAdmin } = useAdmin();
  const [siteInfo] = useLocalStorage('sovereign_info', { name: 'Sovereign', tagline: 'PXG', discord: 'https://discord.gg', logoUrl: '' });

  const logoSrc = (siteInfo as any).logoUrl || defaultLogo;

  const links = [
    { href: '/',        label: 'Home' },
    { href: '/get-key', label: 'Get Key' },
    { href: '/games',   label: 'Games' },
    { href: '/premium', label: 'Premium' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer group">
                <img
                  src={logoSrc}
                  alt={siteInfo.name}
                  className="w-8 h-8 object-contain transition-transform group-hover:scale-110 duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).src = defaultLogo; }}
                />
                <span className="text-xl font-bold text-primary tracking-wide uppercase gold-glow hidden sm:block">{siteInfo.name}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-8">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${
                    location === link.href ? 'text-primary gold-glow' : 'text-muted-foreground hover:text-white'
                  }`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {siteInfo.discord && (
              <a href={siteInfo.discord} target="_blank" rel="noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden sm:block">
                Discord
              </a>
            )}

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button onClick={openAdmin}
                  className="text-[10px] font-bold text-primary/80 hover:text-primary transition-colors uppercase tracking-widest border border-primary/30 px-2 py-1 rounded">
                  ADMIN
                </button>
                <button onClick={() => setIsAdmin(false)}
                  className="text-[10px] font-bold text-red-500/60 hover:text-red-400 transition-colors uppercase tracking-widest cursor-pointer">
                  LOGOUT
                </button>
              </div>
            ) : (
              <button onClick={openAdmin}
                className="text-[10px] font-bold text-primary/30 hover:text-primary/70 transition-colors uppercase tracking-widest cursor-pointer">
                SECRET
              </button>
            )}

            <button className="md:hidden p-2 text-muted-foreground hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-4 pt-2 pb-4 space-y-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  location === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                }`}>
                {link.label}
              </span>
            </Link>
          ))}
          {siteInfo.discord && (
            <a href={siteInfo.discord} target="_blank" rel="noreferrer"
              className="block px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:bg-white/5 hover:text-white">
              Discord
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
