import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type FloatingHintVariant = 'info' | 'success' | 'error';

interface FloatingHintProps {
  show: boolean;
  children: React.ReactNode;
  variant?: FloatingHintVariant;
  className?: string;
}

const variantStyles: Record<FloatingHintVariant, string> = {
  info: "bg-[#F5F0E8]/90 border-[rgba(139,115,85,0.2)] text-[#5C4A36]",
  success: "bg-emerald-100/90 border-emerald-500/30 text-emerald-800",
  error: "bg-rose-100/90 border-rose-500/30 text-rose-800",
};

export const FloatingHint: React.FC<FloatingHintProps> = ({
  show,
  children,
  variant = 'info',
  className,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          className={cn(
            "absolute top-10 left-1/2 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border flex items-center gap-2 z-40 pointer-events-none",
            variantStyles[variant],
            className
          )}
          style={{ boxShadow: '0 4px 12px rgba(139,115,85,0.1)' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
