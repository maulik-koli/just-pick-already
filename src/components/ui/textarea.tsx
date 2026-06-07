import * as React from "react"

import { cn } from "@/lib/utils"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

interface TextareaPorps extends React.ComponentProps<"textarea"> {
  error?: string
  label?: string
}

function Textarea({ className, label, error, ...props }: TextareaPorps) {
  return (
    <Field>
      {label && (
        <FieldLabel className="text-xs font-bold tracking-widest text-foreground/80 flex items-center gap-2">
          {label}
        </FieldLabel>
      )}
      <textarea
        data-slot="textarea"
        className={cn(
          "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          "",
          "bg-background/50 border-2 border-border rounded-xl min-h-[140px] resize-none px-4 py-3 text-sm focus-visible:border-primary focus-visible:ring-0 w-full shadow-inner transition-colors",
          className
        )}
        {...props}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}

export { Textarea }
