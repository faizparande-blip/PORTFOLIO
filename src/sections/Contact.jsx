import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  Copy,
  ExternalLink,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Github, Linkedin } from '../components/ui/Icons';
import { portfolioData } from '../data/portfolio';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { sendContactMessage } from '../services/contactService';

const ContactSuccess = lazy(() => import('../components/ContactSuccess'));

export const Contact = () => {
  const { contact, personal, social } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    personal.email
  )}`;

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format (e.g. name@example.com).';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (formStatus === 'error') {
      setFormStatus('idle');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === 'submitting') return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      await sendContactMessage(formData);
      setFormStatus('success');
    } catch (err) {
      setFormStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setFormStatus('idle');
    setErrorMessage('');
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#07111F]/40 backdrop-blur-xs border-t border-slate-800/80 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeading
          tag="CONTACT"
          title="Let's build something great."
          subtitle={contact.subheading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start w-full">
          {/* Left Column: Direct Contact Details & Links with Glassmorphism */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 w-full">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">
                Get in touch
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                Whether you have an engineering opportunity, a collaborative data project, or a technical consultation, my inbox is always open.
              </p>
            </div>

            {/* Email Card (Frosted Glass Surface) */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#0B1726]/80 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/40 shadow-xl flex flex-col xs:flex-row xs:items-center justify-between gap-3 w-full overflow-hidden transition-colors">
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 overflow-hidden group cursor-pointer"
                title="Click to compose email in Gmail"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1 font-mono">
                    <span>Direct Email</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                  </div>
                  <div className="text-xs sm:text-base font-semibold text-slate-100 group-hover:text-cyan-300 truncate transition-colors">
                    {personal.email}
                  </div>
                </div>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-2 rounded-lg bg-[#07111F]/90 hover:bg-[#102238] border border-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer min-h-[38px] self-start xs:self-auto"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-cyan-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Availability with Glassmorphism */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#0B1726]/80 backdrop-blur-md border border-slate-800/80 shadow-xl space-y-2.5 sm:space-y-3 w-full">
              {personal.location && (
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="break-words">{personal.location}</span>
                </div>
              )}
              {contact.availability && (
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="break-words">{contact.availability}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 sm:mb-3 font-mono">
                Connect Online
              </div>
              <div className="flex flex-wrap gap-2">
                {social.github && (
                  <Button
                    href={social.github}
                    variant="secondary"
                    size="sm"
                    className="min-h-[40px]"
                    icon={<Github className="w-4 h-4 text-slate-300" />}
                    isExternal
                  >
                    GitHub
                  </Button>
                )}
                {social.linkedin && (
                  <Button
                    href={social.linkedin}
                    variant="secondary"
                    size="sm"
                    className="min-h-[40px]"
                    icon={<Linkedin className="w-4 h-4 text-cyan-400" />}
                    isExternal
                  >
                    LinkedIn
                  </Button>
                )}
                {personal.email && (
                  <Button
                    href={gmailComposeUrl}
                    variant="secondary"
                    size="sm"
                    className="min-h-[40px]"
                    icon={<Mail className="w-4 h-4 text-cyan-400" />}
                    isExternal
                  >
                    Gmail
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Frosted Glass Form / Email Sent Success Container */}
          <div className="lg:col-span-7 w-full">
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <Suspense fallback={null}>
                  <ContactSuccess
                    key="success"
                    onReset={handleReset}
                    email={formData.email}
                  />
                </Suspense>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0B1726]/80 backdrop-blur-xl border border-slate-800/90 hover:border-cyan-500/30 shadow-2xl w-full overflow-hidden transition-colors"
                >
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      Send a Message
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500">
                      SECURE INQUIRY
                    </span>
                  </div>

                  {formStatus === 'error' && (
                    <div className="mb-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 w-full">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Your Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={formStatus === 'submitting'}
                          placeholder="Alex Morgan"
                          className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#07111F]/80 backdrop-blur-sm border text-white text-sm placeholder-slate-500 focus:bg-[#050B14]/95 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all min-h-[44px] disabled:opacity-60 ${
                            errors.name
                              ? 'border-rose-500/60 focus:border-rose-400'
                              : 'border-slate-800'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-rose-400 mt-1 font-medium">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={formStatus === 'submitting'}
                          placeholder="alex@example.com"
                          className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#07111F]/80 backdrop-blur-sm border text-white text-sm placeholder-slate-500 focus:bg-[#050B14]/95 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all min-h-[44px] disabled:opacity-60 ${
                            errors.email
                              ? 'border-rose-500/60 focus:border-rose-400'
                              : 'border-slate-800'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-400 mt-1 font-medium">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={formStatus === 'submitting'}
                        placeholder="Project Inquiry / Job Opportunity"
                        className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#07111F]/80 backdrop-blur-sm border border-slate-800 text-white text-sm placeholder-slate-500 focus:bg-[#050B14]/95 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all min-h-[44px] disabled:opacity-60"
                      />
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Message <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={formStatus === 'submitting'}
                        placeholder="Tell me about your project or opportunity..."
                        className={`w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#07111F]/80 backdrop-blur-sm border text-white text-sm placeholder-slate-500 focus:bg-[#050B14]/95 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all resize-none disabled:opacity-60 ${
                          errors.message
                            ? 'border-rose-500/60 focus:border-rose-400'
                            : 'border-slate-800'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-400 mt-1 font-medium">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto min-h-[44px] min-w-[160px] justify-center shadow-lg shadow-cyan-500/25"
                        disabled={formStatus === 'submitting'}
                        icon={
                          formStatus === 'submitting' ? (
                            <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          ) : (
                            <Send className="w-4 h-4 text-slate-950" />
                          )
                        }
                      >
                        {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
