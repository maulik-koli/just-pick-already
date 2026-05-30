import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

const Toaster = ({ ...props }: ToasterProps) => {

  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 text-emerald-500" strokeWidth={3} />,
        info: <InfoIcon className="size-5 text-blue-500" strokeWidth={3} />,
        warning: <TriangleAlertIcon className="size-5 text-accent" strokeWidth={3} />,
        error: <OctagonXIcon className="size-5 text-destructive" strokeWidth={3} />,
        loading: <Loader2Icon className="size-5 text-primary animate-spin" strokeWidth={3} />,
      }}
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast relative overflow-hidden flex items-start gap-3 w-full",
            "group-[.toaster]:text-foreground group-[.toaster]:bg-card group-[.toaster]:border-2",
            "group-[.toaster]:shadow-[4px_4px_0_rgba(26,26,26,0.1)] group-[.toaster]:rounded-xl font-sans p-4 dot-texture",
            "data-[type=success]:!border-emerald-500/30 data-[type=success]:!border-l-[6px] data-[type=success]:!border-l-emerald-500",
            "data-[type=error]:!border-destructive/30 data-[type=error]:!border-l-[6px] data-[type=error]:!border-l-destructive",
            "data-[type=warning]:!border-accent/30 data-[type=warning]:!border-l-[6px] data-[type=warning]:!border-l-accent",
            "data-[type=info]:!border-blue-500/30 data-[type=info]:!border-l-[6px] data-[type=info]:!border-l-blue-500",
            "data-[type=default]:!border-border"
          ),
          content: "flex flex-col gap-1 w-full",
          description: "group-[.toast]:text-muted-foreground font-medium text-[13px] leading-relaxed",
          title: "font-extrabold text-[14px] uppercase tracking-wide text-foreground leading-none",
          actionButton: cn(
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            "group-[.toast]:font-bold group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:rounded-lg",
            "group-[.toast]:text-xs group-[.toast]:shadow-[2px_2px_0_rgba(26,26,26,0.1)] transition-all hover:group-[.toast]:opacity-90 mt-1"
          ),
          cancelButton: cn(
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            "group-[.toast]:font-semibold group-[.toast]:px-4 group-[.toast]:py-2 group-[.toast]:rounded-lg group-[.toast]:text-xs transition-colors hover:group-[.toast]:bg-muted/80 mt-1"
          ),
          icon: "mt-0.5",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
