import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import { portfolioData } from '../../data/portfolio';

export const Footer = () => {
  const { footer, personal, social } = portfolioData;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    personal.email
  )}`;

  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-100">
          {/* Left Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a
              href="#hero"
              className="flex items-center gap-2 font-bold text-base text-slate-900 mb-1"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600 text-white font-mono text-xs font-semibold">
                {personal.name ? personal.name.charAt(0) : 'P'}
              </span>
              <span>{personal.name}</span>
            </a>
            <p className="text-xs text-slate-500 max-w-sm">
              {footer.quote}
            </p>
          </div>

          {/* Center: Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-600">
            {footer.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Social & Scroll Top */}
          <div className="flex items-center gap-2.5">
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-blue-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {personal.email && (
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                aria-label="Send Email via Gmail"
                title="Send Email via Gmail"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-blue-600 hover:bg-slate-100 border border-slate-200 transition-colors ml-2 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} {personal.name}. All rights reserved.
          </div>
          <div>
            Designed with modern React & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
