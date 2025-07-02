import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SailboatLogoIcon, MenuIcon } from './IconComponents';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinksData = [
    { href: '/', label: 'Inicio' },
    { href: '/#temas', label: 'Temas' },
    { href: '/#acerca-de', label: 'Acerca de' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';

  // Scroll a #temas si corresponde
  useEffect(() => {
    if (window.localStorage.getItem('scrollToTemas') === '1') {
      window.localStorage.removeItem('scrollToTemas');
      setTimeout(() => {
        const el = document.getElementById('temas');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }, []);

  // Handler especial para Temas
  const handleTemasClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
    if (isHomePage) {
      const el = document.getElementById('temas');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.localStorage.setItem('scrollToTemas', '1');
      navigate('/');
    }
  };

  return (
    <header className="bg-slate-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center" aria-label="Sail-it - Página de inicio">
            <SailboatLogoIcon className="h-8 w-8 lg:h-10 lg:w-10 text-sky-700" />
            <span className="ml-2 text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">Sail-it</span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8" aria-label="Navegación principal">
            {navLinksData.map(link => (
              link.label === 'Temas' ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 hover:text-sky-700 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors hover:bg-slate-200"
                  onClick={handleTemasClick}
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className="text-slate-600 hover:text-sky-700 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors hover:bg-slate-200"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
          
          <div className="lg:hidden flex items-center">
            <button 
              id="mobile-menu-button" 
              type="button" 
              className="bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-700 p-2 rounded-md transition-colors" 
              aria-label="Abrir menú principal" 
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMobileMenu}
            >
              <MenuIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      <nav 
        id="mobile-menu" 
        className={`lg:hidden bg-slate-100 ${isMobileMenuOpen ? '' : 'hidden'}`} 
        aria-label="Navegación móvil"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinksData.map(link => (
            link.label === 'Temas' ? (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-sky-700 hover:bg-slate-200 block px-3 py-3 rounded-md text-base font-medium transition-colors mobile-nav-link"
                onClick={handleTemasClick}
              >
                {link.label}
              </a>
            ) : (
              <Link 
                key={link.href}
                to={link.href} 
                className="text-slate-600 hover:text-sky-700 hover:bg-slate-200 block px-3 py-3 rounded-md text-base font-medium transition-colors mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            )
          ))}
          {!isHomePage && (
            <Link 
              to="/"
              className="text-sky-700 hover:text-sky-800 hover:bg-sky-100 block px-3 py-3 rounded-md text-base font-medium transition-colors mobile-nav-link border-t border-slate-200 mt-2 pt-3"
              onClick={closeMobileMenu}
            >
              ← Volver al Inicio
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header; 