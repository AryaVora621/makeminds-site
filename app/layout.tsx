import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, Geist_Mono } from "next/font/google";
import BootLoader from "./_components/effects/BootLoader";
import TopHairline from "./_components/effects/TopHairline";
import PageTransition from "./_components/effects/PageTransition";
import KonamiTerminal from "./_components/effects/KonamiTerminal";
import ConsoleBanner from "./_components/effects/ConsoleBanner";
import DebugGrid from "./_components/effects/DebugGrid";
import TopNav from "./_components/nav/TopNav";
import Footer from "./_components/layout/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://makemindsrobotics.org"),
  title: {
    default: "MakEMinds Robotics · FTC 23786",
    template: "%s · MakEMinds Robotics",
  },
  description:
    "FTC Team 23786 — student-led robotics from Edison, NJ. Engineering notebook, season results, programs, and outreach.",
  openGraph: {
    title: "MakEMinds Robotics · FTC 23786",
    description:
      "Student-led FTC robotics from Edison, NJ. 27 events, 8 awards, building since 2023.",
    type: "website",
    url: "/",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-grain min-h-full flex flex-col">
        <TopHairline />
        <TopNav />
        <div data-boot-fade className="flex flex-1 flex-col pt-20">
          {children}
          <Footer />
        </div>
        <PageTransition />
        <BootLoader />
        <KonamiTerminal />
        <ConsoleBanner />
        <DebugGrid />
      </body>
    </html>
  );
}
