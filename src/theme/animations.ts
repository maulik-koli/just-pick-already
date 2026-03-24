export const animations = {
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

export type Animations = typeof animations;