import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#1e1215]/95 border border-[#d4af37]/40 text-[#faf5ee] shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-sm sm:text-base font-devanagari max-w-[90vw]"
        >
          <CheckCircle2 className="w-4 h-4 text-[#e2b866] shrink-0" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
