import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { getSiteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Algo Pathfinder | Visualize Pathfinding Algorithms";
const siteDescription =
  "Interactive visualization tool for BFS, DFS, and A* pathfinding algorithms. Watch algorithms explore mazes in real-time.";
const ogDescription =
  "Visualize pathfinding algorithms like BFS, DFS, and A* in action on interactive mazes.";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "pathfinding",
    "algorithms",
    "BFS",
    "DFS",
    "A*",
    "visualization",
    "maze",
  ],
  authors: [{ name: "Chris Shockley" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: ogDescription,
    type: "website",
    url: "/",
    siteName: "Algo Pathfinder",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Algo Pathfinder — BFS, DFS, and A* maze visualization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: ogDescription,
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Algo Pathfinder",
  description: siteDescription,
  url: siteUrl,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  author: {
    "@type": "Person",
    name: "Chris Shockley",
  },
  codeRepository: "https://github.com/cishocksr/Algo-Pathfinder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
