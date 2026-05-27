import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ShinyButtonProps
    extends Omit<HTMLMotionProps<"button">, "className" | "style">, VariantProps<typeof buttonVariants> {
  shinyDuration?: number;
  shinyDelay?: number;
  hideShiny?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      children,
      shinyDuration = 2.4,
      shinyDelay = 0.6,
      hideShiny = false,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        asChild
        variant={variant}
        size={size}
        className={cn("relative overflow-hidden", className)}
      >
        <motion.button ref={ref} {...props}>
          <span className="relative z-10 inline-flex items-center justify-center gap-2 w-full h-full">
            {children}
          </span>
          {!hideShiny && (
            <motion.span
              aria-hidden
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{
                background:
                  "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
              }}
              initial={{ x: "-150%" }}
              animate={{ x: "350%" }}
              transition={{
                duration: shinyDuration,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: shinyDelay,
              }}
            />
          )}
        </motion.button>
      </Button>
    );
  }
);
ShinyButton.displayName = "ShinyButton";

export { ShinyButton };
