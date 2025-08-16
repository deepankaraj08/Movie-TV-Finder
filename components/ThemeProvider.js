import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for saved theme in localStorage on initial load
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Apply the theme class to the document's root element
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Add or remove the 'dark' class based on the new theme
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save the new theme to localStorage
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    // Return null to avoid hydration mismatch while loading on the client
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}