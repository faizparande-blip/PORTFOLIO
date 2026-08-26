import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import { portfolioData } from '../../data/portfolio';
import { useActiveSection } from '../../hooks/useActiveSection';
import Button from '../ui/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
  const activeSection = useActiveSection(sectionIds, 100);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo / Name */}
        <a
          href="#hero"
          className="group flex items-center gap-2 font-bold text-base tracking-tight text-slate-900 hover:text-blue-600 transition-colors"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-mono text-sm font-semibold shadow-xs">
            {portfolioData.personal.name ? portfolioData.personal.name.charAt(0) : 'P'}
          </span>
          <span className="text-slate-900 group-hover:text-blue-600 transition-colors">
            {portfolioData.personal.name}
          </span>
        </a>

        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/60"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Resume & Social */}
        <div className="hidden md:flex items-center gap-3">
          {portfolioData.social.github && (
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {portfolioData.social.resume && (
            <Button
              href={portfolioData.social.resume}
              variant="secondary"
              size="sm"
              icon={<FileText className="w-3.5 h-3.5 text-blue-600" />}
              isExternal
            >
              Resume
            </Button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-6 py-5 shadow-lg"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                {portfolioData.social.resume && (
                  <Button
                    href={portfolioData.social.resume}
                    variant="primary"
                    size="md"
                    className="w-full"
                    icon={<FileText className="w-4 h-4" />}
                    isExternal
                  >
                    Resume
                  </Button>
                )}
                {portfolioData.social.github && (
                  <Button
                    href={portfolioData.social.github}
                    variant="secondary"
                    size="md"
                    icon={<Github className="w-4 h-4" />}
                    isExternal
                    aria-label="GitHub"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
