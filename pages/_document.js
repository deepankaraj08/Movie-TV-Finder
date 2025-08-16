import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>PopcornMeter</title> {/* Corrected syntax here */}
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}