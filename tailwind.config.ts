import type { Config } from "tailwindcss"
const { heroui } = require("@heroui/react");

const colors = {
    primary: {
        50: "#f0ebff",
        100: "#e5d9ff",
        200: "#d1b3ff",
        300: "#b88cff",
        400: "#9966ff",
        500: "#7C6FF7",
        600: "#6b5ce0",
        700: "#5949c9",
        800: "#4736b2",
        900: "#35239b",
        foreground: "#FFFFFF",
        DEFAULT: "#7C6FF7",
    },
    secondary: {
        50: "#fff9e6",
        100: "#fff3cc",
        200: "#ffe699",
        300: "#ffd966",
        400: "#ffcc33",
        500: "#F5A623",
        600: "#e6941f",
        700: "#d7821a",
        800: "#c87015",
        900: "#b95e10",
        foreground: "#1A1A1A",
        DEFAULT: "#F5A623",
    },
    success: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#145231",
        DEFAULT: "#22c55e",
        foreground: "#FFFFFF",
    },
    warning: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        DEFAULT: "#f59e0b",
        foreground: "#FFFFFF",
    },
    error: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        DEFAULT: "#dc2626",
        foreground: "#FFFFFF",
    },
    background: "#FAFAF8",
    foreground: "#1A1A1A",
    card: "#FFFFFF",
    text: {
        primary: "#1A1A1A",
        secondary: "#6B7B7B",
        muted: "#9CA3AF",
        inverse: "#FFFFFF",
    },
    border: "#E5E7EB",
    divider: "#F3F4F6",
    info: "#3B82F6",
    disabled: "#D1D5DB",
    placeholder: "#9CA3AF",
    tags: {
        prioritization: "#E0E7FF",
        psychology: "#FCE7F3",
        risk: "#FEE2E2",
        strategy: "#DBEAFE",
        longTermThinking: "#DBEAFE",
    },
};

const typography = {
    fontFamily: {
        display: [
            "Clash Display",
            "Syne",
            "Cabinet Grotesk",
            "system-ui",
            "sans-serif",
        ].join(","),
        body: [
            "DM Sans",
            "Plus Jakarta Sans",
            "system-ui",
            "sans-serif",
        ].join(","),
        mono: [
            "JetBrains Mono",
            "Fira Code",
            "Courier New",
            "monospace",
        ].join(","),
    },
    fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
        "5xl": ["48px", { lineHeight: "48px" }],
    },
    fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
    },
};

const spacing = {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "40px",
    "4xl": "48px",
    "5xl": "56px",
    "6xl": "64px",
};

const containerSizes = {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1400px",
};

const shadows = {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    primaryGlow: "0 0 20px rgba(124, 111, 247, 0.3)",
    secondaryGlow: "0 0 20px rgba(245, 166, 35, 0.3)",
};

const animations = {
    duration: {
        fast: "100ms",
        base: "200ms",
        slow: "300ms",
        slower: "400ms",
    },
    easing: {
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeInQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
        easeOutQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        easeInOutQuad: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
    },
    keyframes: {
        fadeIn: {
            from: { opacity: 0 },
            to: { opacity: 1 },
        },
        slideUp: {
            from: { opacity: 0, transform: "translateY(10px)" },
            to: { opacity: 1, transform: "translateY(0)" },
        },
        slideDown: {
            from: { opacity: 0, transform: "translateY(-10px)" },
            to: { opacity: 1, transform: "translateY(0)" },
        },
        pulse: {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.5 },
        },
        shimmer: {
            "0%": { backgroundPosition: "-200% 0" },
            "100%": { backgroundPosition: "200% 0" },
        },
    },
};

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.primary,
                secondary: colors.secondary,
                background: colors.background,
                foreground: colors.foreground,
                card: colors.card,
                text: colors.text,
                border: colors.border,
                divider: colors.divider,
                success: colors.success,
                warning: colors.warning,
                error: colors.error,
                info: colors.info,
                disabled: colors.disabled,
                placeholder: colors.placeholder,
            },
            spacing: spacing,
            maxWidth: containerSizes,
            boxShadow: shadows,
            fontFamily: typography.fontFamily,
            fontSize: typography.fontSize,
            fontWeight: typography.fontWeight,
            keyframes: animations.keyframes,
            animation: {
                fadeIn: `fadeIn ${animations.duration.base} ${animations.easing.out}`,
                slideUp: `slideUp ${animations.duration.base} ${animations.easing.out}`,
                slideDown: `slideDown ${animations.duration.base} ${animations.easing.out}`,
                pulseSoft: `pulse ${animations.duration.slower} ${animations.easing.inOut} infinite`,
                shimmer: `shimmer ${animations.duration.slower} ${animations.easing.linear} infinite`,
            },
            transitionDuration: animations.duration,
            transitionTimingFunction: animations.easing,
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            themes: {
                light: {
                    colors: {
                        primary: colors.primary,
                        secondary: colors.secondary,
                        success: colors.success,
                        warning: colors.warning,
                        danger: colors.error,
                        background: colors.background,
                        foreground: colors.foreground,
                        divider: colors.border,
                    },
                },
                dark: {
                    colors: {
                        primary: {
                            ...colors.primary,
                            DEFAULT: colors.primary[400],
                        },
                        secondary: {
                            ...colors.secondary,
                            DEFAULT: colors.secondary[400],
                            foreground: "#000000",
                        },
                        success: colors.success,
                        warning: colors.warning,
                        danger: {
                            ...colors.error,
                            DEFAULT: colors.error[500],
                        },
                        background: "#0F0F0F",
                        foreground: "#FFFFFF",
                        divider: "#333333",
                    },
                },
            },
        }),
    ],
}
export default config