import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://macenauer.net'),
  title: "Oto Macenauer - Full-stack Developer",
  description: "Personal portfolio website of Oto Macenauer. Full-stack developer specializing in modern web technologies and innovative solutions.",
  keywords: "Oto Macenauer, software engineer, developer, portfolio, web development, programming",
  authors: [{ name: "Oto Macenauer" }],
  creator: "Oto Macenauer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://macenauer.net",
    title: "Oto Macenauer - Full-stack Developer",
    description: "Personal portfolio website of Oto Macenauer. Full-stack developer specializing in modern web technologies and innovative solutions.",
    siteName: "Oto Macenauer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oto Macenauer - Full-stack Developer",
    description: "Personal portfolio website of Oto Macenauer. Full-stack developer specializing in modern web technologies and innovative solutions.",
    creator: "@otomacenauer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
