import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { Github } from '../ui/Icons';
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
      setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050B14]/85 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20 py-3 sm:py-3.5'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: FP Logo / Name */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 font-bold text-sm sm:text-base tracking-tight text-slate-100 hover:text-cyan-400 transition-colors shrink-0 max-w-[65%] sm:max-w-none"
        >
          <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-400 text-slate-950 font-mono text-xs sm:text-sm font-extrabold shadow-sm shadow-cyan-500/30 group-hover:scale-105 transition-transform shrink-0">
            FP
          </span>
          <span className="text-slate-100 group-hover:text-cyan-400 transition-colors truncate">
            {portfolioData.personal.name}
          </span>
        </a>

        {/* Center: Desktop Navigation Pills with Sliding Indicator */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0B1726]/90 p-1 rounded-full border border-slate-800/90 backdrop-blur-sm shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-3.5 lg:px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                  isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-950/80 via-[#0C2238] to-cyan-950/80 rounded-full border border-cyan-400/50 shadow-xs shadow-cyan-400/25 overflow-hidden"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  >
                    <span className="absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-xs shadow-cyan-400" />
                  </motion.span>
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: GitHub Icon + Download Resume Button */}
        <div className="hidden md:flex items-center gap-2.5">
          {portfolioData.social.github && (
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-[#0B1726] rounded-lg border border-transparent hover:border-slate-800 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center shrink-0"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {portfolioData.social.resume && (
            <Button
              href={portfolioData.social.resume}
              download="Muhammad_Faiz_Parande_Resume.pdf"
              variant="secondary"
              size="sm"
              icon={<Download className="w-3.5 h-3.5 text-cyan-400" />}
              className="shadow-xs hover:border-cyan-500/50 text-xs px-3.5 py-2 font-medium"
            >
              Download Resume
            </Button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 text-slate-300 hover:text-cyan-400 rounded-xl hover:bg-[#0B1726] border border-slate-800/80 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer with Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] bg-slate-950/70 backdrop-blur-xs z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-50 md:hidden border-b border-cyan-500/20 bg-[#07111F]/98 backdrop-blur-xl px-5 py-4 shadow-2xl"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                      activeSection === link.id
                        ? 'bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 font-semibold'
                        : 'text-slate-300 hover:bg-[#0B1726] hover:text-slate-100'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="pt-3 mt-1 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  {portfolioData.social.resume && (
                    <Button
                      href={portfolioData.social.resume}
                      download="Muhammad_Faiz_Parande_Resume.pdf"
                      variant="primary"
                      size="md"
                      className="w-full min-h-[44px] justify-center shadow-md shadow-cyan-500/20"
                      icon={<Download className="w-4 h-4 text-slate-950" />}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Download Resume
                    </Button>
                  )}
                  {portfolioData.social.github && (
                    <Button
                      href={portfolioData.social.github}
                      variant="secondary"
                      size="md"
                      className="min-h-[44px] min-w-[44px] px-3"
                      icon={<Github className="w-4 h-4 text-cyan-400" />}
                      isExternal
                      aria-label="GitHub Profile"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
