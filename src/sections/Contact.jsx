import React, { useState } from 'react';
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
import ContactSuccess from '../components/ContactSuccess';
import { sendContactMessage } from '../services/contactService';

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
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-50/60 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="CONTACT"
          title="Let's build something great."
          subtitle={contact.subheading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Get in touch
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether you have an internship opportunity, a full-stack project, or a technical consultation, my inbox is always open.
              </p>
            </div>

            {/* Email Card that opens Gmail Compose */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3">
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 overflow-hidden group cursor-pointer"
                title="Click to compose email in Gmail"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <span>Direct Email</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-blue-600 truncate transition-colors">
                    {personal.email}
                  </div>
                </div>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Availability */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              {personal.location && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{personal.location}</span>
                </div>
              )}
              {contact.availability && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{contact.availability}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Connect Online
              </div>
              <div className="flex flex-wrap gap-2.5">
                {social.github && (
                  <Button
                    href={social.github}
                    variant="secondary"
                    size="sm"
                    icon={<Github className="w-4 h-4" />}
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
                    icon={<Linkedin className="w-4 h-4 text-blue-600" />}
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
                    icon={<Mail className="w-4 h-4 text-emerald-600" />}
                    isExternal
                  >
                    Gmail
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form / Email Sent Success Container */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <ContactSuccess
                  key="success"
                  onReset={handleReset}
                  email={formData.email}
                />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-bold text-slate-900">
                      Send a Message
                    </h4>
                    <span className="text-xs font-mono text-slate-400">
                      SECURE INQUIRY
                    </span>
                  </div>

                  {formStatus === 'error' && (
                    <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={formStatus === 'submitting'}
                          placeholder="Alex Morgan"
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all disabled:opacity-60 ${
                            errors.name
                              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                              : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={formStatus === 'submitting'}
                          placeholder="alex@example.com"
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all disabled:opacity-60 ${
                            errors.email
                              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                              : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={formStatus === 'submitting'}
                        placeholder="Project Inquiry / Job Opportunity"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-60"
                      />
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={formStatus === 'submitting'}
                        placeholder="Tell me about your project or opportunity..."
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all resize-none disabled:opacity-60 ${
                          errors.message
                            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button with Loading Indicator */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto shadow-md shadow-blue-500/10 min-w-[160px]"
                        disabled={formStatus === 'submitting'}
                        icon={
                          formStatus === 'submitting' ? (
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                          ) : (
                            <Send className="w-4 h-4" />
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
