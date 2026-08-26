import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import EmailSentAnimation from './EmailSentAnimation';
import Button from './ui/Button';

export const ContactSuccess = ({ onReset, email = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      role="status"
      aria-live="polite"
      className="p-8 sm:p-10 rounded-3xl bg-[#0B1726] border border-slate-800 shadow-2xl flex flex-col items-center text-center space-y-4 w-full"
    >
      {/* Animated Email Vector in Midnight Cyan */}
      <EmailSentAnimation />

      {/* Success Title */}
      <div className="space-y-1.5 pt-1">
        <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Message Sent Successfully!
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
          Thanks for reaching out! I've received your message and will get back to you as soon as possible{email ? ` at ${email}` : ''}.
        </p>
      </div>

      {/* Send Another Message Button */}
      <div className="pt-3">
        <Button
          variant="secondary"
          size="md"
          onClick={onReset}
          icon={<RefreshCw className="w-4 h-4 text-cyan-400" />}
          className="shadow-md hover:border-cyan-500/50"
        >
          Send Another Message
        </Button>
      </div>
    </motion.div>
  );
};

export default ContactSuccess;
