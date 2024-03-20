"use client";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-full h-screen flex items-center justify-center`}>
        {children}
      </body>
    </html>
  );
}
