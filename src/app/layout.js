import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthButton from "@/components/AuthButton";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: {
    default: "LankaTrail — Backpacker's Guide to Sri Lanka",
    template: "%s | LankaTrail",
  },
  description: "Public transport routes, costs, durations, hostels and food — plan your Sri Lanka backpacking trip stop by stop.",
  openGraph: {
    title: "LankaTrail — Backpacker's Guide to Sri Lanka",
    description: "Real transport routes, costs, and trip planning for backpackers in Sri Lanka.",
    url: "https://sri-lanka-backpacker.vercel.app",
    siteName: "LankaTrail",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LankaTrail — Backpacker's Guide to Sri Lanka",
    description: "Real transport routes, costs, and trip planning for backpackers in Sri Lanka.",
  },
  verification: {
    google: "9geXQzGwthT2ddrsuDgld_UkbwIKNbTFy93oZQweBwA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body bg-parchment text-ink`}>
        <Navbar authSlot={<AuthButton />} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}