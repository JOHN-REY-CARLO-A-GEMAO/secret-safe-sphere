import { useState, useEffect } from 'react';
import { Shield, Menu, X, LogIn } from 'lucide-react';
import { SlideIn } from './Animations';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { authState, signOut } = useAuth();
  const { user, profile } = authState;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <SlideIn className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-primary" />
          <span className="font-display text-xl font-medium">Whisperspace</span>
        </SlideIn>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['About', 'Privacy', 'Guidelines', 'Support'].map((item, index) => (
            <SlideIn key={item} delay={100 + index * 100}>
              <a
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item}
              </a>
            </SlideIn>
          ))}
          
          {user ? (
            <SlideIn delay={500}>
              <div className="flex items-center space-x-4">
                {profile?.role === 'admin' && (
                  <span className="text-sm font-medium text-primary">Admin</span>
                )}
                <Button variant="outline" onClick={signOut}>
                  Sign out
                </Button>
              </div>
            </SlideIn>
          ) : (
            <SlideIn delay={500}>
              <Link to="/auth">
                <Button>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in
                </Button>
              </Link>
            </SlideIn>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md p-5 md:hidden animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              {['About', 'Privacy', 'Guidelines', 'Support'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              
              {user ? (
                <div className="pt-2 border-t border-gray-100">
                  {profile?.role === 'admin' && (
                    <span className="block text-sm font-medium text-primary mb-2">
                      Admin
                    </span>
                  )}
                  <Button variant="outline" onClick={signOut} className="w-full">
                    Sign out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign in
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
