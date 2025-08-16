// App.jsx
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

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

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    // Avoid hydration mismatch
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="p-4 flex justify-between bg-gray-200 dark:bg-gray-800 shadow-md">
        <Link
          href="/"
          className="text-2xl font-bold cursor-pointer text-gray-900 dark:text-gray-100"
        >
          🎬 Movie & TV Finder
        </Link>
   
      </header>

      <main>
        <Component {...pageProps} theme={theme} toggleTheme={toggleTheme} />
      </main>
    </div>
  );
}
