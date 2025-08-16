import "@/styles/globals.css";
import Link from "next/link";
import Head from "next/head";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";

// This component uses the theme from context and renders your layout
function AppContent({ Component, pageProps }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Head>
        <title>PopcornMeter</title>
        <meta
          name="description"
          content="PopcornMeter - Discover movie ratings and trailers with ease."
        />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800 shadow-md">
          <Link
            href="/"
            className="text-2xl font-bold cursor-pointer text-gray-900 dark:text-gray-100"
          >
            🍿 PopcornMeter
          </Link>

          {/* <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button> */}
        </header>

        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

// This is the default export that wraps the application in the ThemeProvider
export default function MyApp(props) {
  return (
    <ThemeProvider>
      <AppContent {...props} />
    </ThemeProvider>
  );
}