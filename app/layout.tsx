import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.macenauer.net'),
  title: "Oto Macenauer - Tech Lead & Full-Stack Engineer",
  description: "Personal portfolio of Oto Macenauer. Tech Lead at Absa Group with over a decade of experience in .NET, Python, Angular, AWS, and Kubernetes.",
  keywords: "Oto Macenauer, software engineer, developer, portfolio, web development, programming",
  authors: [{ name: "Oto Macenauer" }],
  creator: "Oto Macenauer",
  icons: {
    icon: [
      { url: 'https://www.macenauer.net/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: 'https://www.macenauer.net/favicon.svg',
    apple: 'https://www.macenauer.net/favicon.svg',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.macenauer.net",
    title: "Oto Macenauer - Tech Lead & Full-Stack Engineer",
    description: "Personal portfolio of Oto Macenauer. Tech Lead at Absa Group with over a decade of experience in .NET, Python, Angular, AWS, and Kubernetes.",
    siteName: "Oto Macenauer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oto Macenauer - Tech Lead & Full-Stack Engineer",
    description: "Personal portfolio of Oto Macenauer. Tech Lead at Absa Group with over a decade of experience in .NET, Python, Angular, AWS, and Kubernetes.",
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
