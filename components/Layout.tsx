import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'GAMES', path: '/portfolio' },
  ];

  const logoUrl = "https://pub-94eece7237094db1a48a9e8c5773cafa.r2.dev/bensstudy/2026/01-logo%20English@4x-81769006740997.png";

  return (
    /* Removed overflow-x-hidden from here (moved to body) to fix sticky positioning */
    <div className="min-h-screen flex flex-col relative selection:bg-stone-300">
      
      {/* Navigation - Higher Z-index (50) */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-[#ebeae8]/90 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logoUrl} 
              alt="OCTAMAZE" 
              className="h-4 md:h-5 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-stone-900 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-stone-900 after:transition-all after:duration-300 hover:after:w-full ${location.pathname === link.path ? 'text-stone-900 after:w-full' : 'text-stone-500'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-stone-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#ebeae8] z-40 flex flex-col justify-center items-center gap-8 md:hidden">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-serif text-stone-800 uppercase"
              >
                {link.name}
              </Link>
            ))}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-12">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-stone-300 mt-12 bg-[#e6e5e3]">
        <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center items-center gap-2 mb-4 opacity-50">
                <img 
                  src={logoUrl} 
                  alt="OCTAMAZE" 
                  className="h-4 w-auto object-contain grayscale"
                />
            </div>
            <p className="font-serif text-stone-500 text-sm">
                &copy; {new Date().getFullYear()} OCTAMAZE.
            </p>
        </div>
      </footer>
    </div>
  );
};