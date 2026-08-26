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
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#050B14]/85 backdrop-blur-md py-10 sm:py-12 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-slate-800/80 w-full">
          {/* Left Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
            <a
              href="#hero"
              className="flex items-center gap-2 font-bold text-sm sm:text-base text-white mb-1 hover:text-cyan-400 transition-colors"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-400 text-slate-950 font-mono text-xs font-bold shadow-xs shadow-cyan-500/30 shrink-0">
                FP
              </span>
              <span className="truncate">{personal.name}</span>
            </a>
            <p className="text-xs text-slate-400 max-w-sm">
              {footer.quote}
            </p>
          </div>

          {/* Center: Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs font-medium text-slate-400">
            {footer.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-cyan-400 transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Social & Scroll Top */}
          <div className="flex items-center gap-2">
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#0B1726]/80 backdrop-blur-sm text-slate-400 hover:text-white hover:bg-[#102238]/90 border border-slate-800 hover:border-cyan-500/40 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
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
                className="p-2.5 rounded-lg bg-[#0B1726]/80 backdrop-blur-sm text-slate-400 hover:text-cyan-400 hover:bg-[#102238]/90 border border-slate-800 hover:border-cyan-500/40 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
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
                className="p-2.5 rounded-lg bg-[#0B1726]/80 backdrop-blur-sm text-slate-400 hover:text-cyan-400 hover:bg-[#102238]/90 border border-slate-800 hover:border-cyan-500/40 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Send Email via Gmail"
                title="Send Email via Gmail"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-[#0B1726]/80 backdrop-blur-sm text-slate-400 hover:text-cyan-400 hover:bg-[#102238]/90 border border-slate-800 hover:border-cyan-500/40 transition-colors ml-1 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-500 w-full">
          <div>
            © {currentYear} {personal.name}. All rights reserved.
          </div>
          <div>
            Engineered with React, Vite & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
