import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/candid.svg'; // <-- Replace with actual logo path

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/aboutus' },
  { label: 'Our Services', path: '/services' },
  { label: 'Case Studies', path: '/case_study' },
    { label: 'Articles', path: '/articles' },
  { label: 'Contact', path: '/contact' },
];

// 1. MODIFIED NavLink to accept an `onClick` function
const NavLink = ({ label, path = '#', mobile = false, onClick }) => (
  <Link
    to={path}
    onClick={onClick} // This calls the function when the link is clicked
    className={`block px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${
      mobile
        ? 'text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-light)]/20'
        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] hover:bg-[var(--color-primary-light)]/10'
    }`}
  >
    {label}
  </Link>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. CREATED a function to close the menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg relative z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMobileMenu}> {/* Also closes menu on logo click */}
          <img src={logo} alt="Candid HSC Logo" className="h-16 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {menuItems.map((item, index) => (
            <NavLink key={index} label={item.label} path={item.path} />
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[var(--color-text-secondary)] focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12' // Close icon
                    : 'M4 6h16M4 12h16M4 18h16' // Hamburger icon
                }
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              label={item.label}
              path={item.path}
              mobile
              // 3. PASSED the close function to each mobile link
              onClick={closeMobileMenu}
            />
          ))}
        </div>
      )}
    </header>
  );
};


export default Header;

