import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portal Resmi MT. In'am Muslimah x Mahabbah Community",
  description: "Portal kajian, kelas tahsin, dan informasi resmi MT. In'am Muslimah x Mahabbah Community.",
  keywords: ["Kajian Muslimah", "Tahsin", "Mahabbah Community", "MT In'am Muslimah", "Kajian Akhwat"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans antialiased bg-gray-950 flex justify-center items-stretch">
        {children}
      </body>
    </html>
  );
}

