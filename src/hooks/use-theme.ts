import { useCallback } from "react";

export const useTheme = () => {
    const isDark = typeof window !== "undefined" && 
        document.documentElement.classList.contains("dark");

    const toggleDarkMode = useCallback(() => {
        document.documentElement.classList.toggle("dark");
        localStorage.setItem(
            "theme",
            document.documentElement.classList.contains("dark") ? "dark" : "light"
        );
    }, []);

    const setDarkMode = useCallback((isDark: boolean) => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, []);

    return { isDark, toggleDarkMode, setDarkMode };
};