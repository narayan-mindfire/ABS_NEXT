import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>

        <footer className="text-center text-xs text-gray-500 py-6 border-t border-gray-200">
          © 2025 ABS. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
