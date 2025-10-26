import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Algo Pathfinder | Visualize Pathfinding Algorithms",
    description:
        "Interactive visualization tool for BFS, DFS, and A* pathfinding algorithms. Watch algorithms explore mazes in real-time.",
    keywords: ["pathfinding", "algorithms", "BFS", "DFS", "A*", "visualization", "maze"],
    authors: [{ name: "Chris Shockley" }],
    openGraph: {
        title: "Algo Pathfinder",
        description: "Visualize pathfinding algorithms like BFS, DFS, and A* in action",
        type: "website",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}>
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