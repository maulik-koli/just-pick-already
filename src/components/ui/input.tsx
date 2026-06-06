import * as React from "react"

import { cn } from "@/lib/utils"
import { Field, FieldError, FieldLabel } from "./field"

interface InputPorps extends React.ComponentProps<"input"> {
  error?: string
  label?: string
}

function Input({ className, type, error, label, ...props }: InputPorps) {
  return (
    <Field>
      {label && (
        <FieldLabel className="text-xs font-bold tracking-widest text-foreground/80 flex items-center gap-2">
          {label}
        </FieldLabel>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          "",
          "bg-background/50 border-2 border-border rounded-xl h-14 px-4 text-sm focus-visible:border-primary focus-visible:ring-0 w-full shadow-inner transition-colors",
          className
        )}
        {...props}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}

export { Input }
