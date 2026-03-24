export const typography = {
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

    headings: {
        h1: {
            fontSize: "40px",
            fontWeight: "700",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
        },
        h2: {
            fontSize: "32px",
            fontWeight: "700",
            lineHeight: "1.3",
            letterSpacing: "-0.01em",
        },
        h3: {
            fontSize: "24px",
            fontWeight: "600",
            lineHeight: "1.4",
        },
        h4: {
            fontSize: "20px",
            fontWeight: "600",
            lineHeight: "1.4",
        },
        body: {
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "1.6",
        },
        bodySmall: {
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
        },
    },
};

export type Typography = typeof typography;