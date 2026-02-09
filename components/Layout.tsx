import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      // Trigger threshold for shrinking the navbar
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- RESOURCE PROTECTION LOGIC ---
  useEffect(() => {
    // 1. Disable Right Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable Keyboard Shortcuts (DevTools, Save, View Source, Print)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
      }
      
      // Ctrl+Shift+I (DevTools), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
      }
      
      // Mac: Cmd+Option+I/J/C
      if (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'j' || e.key === 'c')) {
         e.preventDefault();
      }

      // Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
      }

      // Ctrl+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
      }
      
      // Ctrl+P (Print)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
      }
    };

    // 3. Disable Dragging (Images/Links)
    const handleDragStart = (e: DragEvent) => {
        e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);
  // ---------------------------------

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'GAMES', path: '/portfolio' },
  ];

  const logoUrl = "https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-logo%20English@4x-81769006740997.png";

  /**
   * Handles navigation clicks.
   * If it's a new page, it navigates normally.
   * If it's the current page, it smooth scrolls to the top.
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (mobileMenuOpen) setMobileMenuOpen(false);
    } else {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center transition-all duration-700 ease-in-out ${
          isScrolled 
            ? 'h-10 bg-main/50 backdrop-blur-md border-b border-stone-400/10 shadow-sm' 
            : 'h-28 md:h-36 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center w-full">
          
          {/* Logo Container */}
          <Link 
            to="/" 
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center group relative z-[110]"
          >
            {/* 
                Logo height adjusted for the compact h-10 (40px) header.
            */}
            <img 
              src={logoUrl} 
              alt="OCTAMAZE" 
              className={`w-auto object-contain transition-all duration-700 ease-in-out ${
                isScrolled 
                  ? 'h-3 md:h-4'   
                  : 'h-5 md:h-8'  
              } group-hover:scale-105`}
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-12 h-full">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-[14px] font-sans tracking-[0.25em] transition-all duration-300 hover:text-stone-900 relative py-1 flex items-center h-full ${
                  location.pathname === link.path 
                    ? 'text-stone-900 font-bold' 
                    : 'text-stone-800'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {location.pathname === link.path && (
                   <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900 animate-in fade-in slide-in-from-left-2 duration-500"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-stone-800 p-2 -mr-2 relative z-[110]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-main z-[120] flex flex-col justify-center items-center gap-10 md:hidden animate-in fade-in zoom-in-95 duration-500">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="text-4xl font-serif text-stone-800 uppercase tracking-widest hover:italic transition-all transform hover:scale-110"
              >
                {link.name}
              </Link>
            ))}
            <div className="absolute bottom-12 font-mono text-[10px] text-stone-400 tracking-[0.4em]">
              ACCESS_GRANTED // MENU_ACTIVE
            </div>
            <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-8 right-8 p-4 text-stone-800"
            >
                <X size={32} />
            </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow pt-28 md:pt-36">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 border-stone-800/10 mt-12 relative z-10">
        <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center items-center gap-2 mb-6 opacity-30 hover:opacity-100 transition-opacity duration-1000">
                <img 
                  src={logoUrl} 
                  alt="OCTAMAZE" 
                  className="h-5 w-auto object-contain grayscale"
                />
            </div>
            <p className="font-mono text-[9px] tracking-[0.4em] text-stone-400 uppercase">
                &copy; {new Date().getFullYear()} OCTAMAZE STUDIO
            </p>
        </div>
      </footer>
    </div>
  );
};