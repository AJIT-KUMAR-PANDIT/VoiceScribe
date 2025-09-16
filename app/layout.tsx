import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { ThemeColorProvider } from "@/components/theme-color-provider";
import { TopNavigation } from "@/components/TopNavigation";
// import AnimatedBackground from "@/components/AnimatedBackground"; // Temporarily removed

export const metadata: Metadata = {
  title: "VoiceScribe :: Your Transcribe Note Maker",
  description: "VoiceScribe :: Your Transcribe Note Maker",
  keywords:
    "voice scribe, transcribe, note maker, voice note, voice note maker, voice note transcribe, voice note transcribe maker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-background font-sans antialiased ${GeistMono.variable} relative`}
      >
        <ThemeColorProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <TopNavigation />
              <ResponsiveContainer className="flex flex-col flex-1">
                {" "}
                {/* Added className */}
                {/* <AnimatedBackground /> */}
                {/* Temporarily removed */}
                {children}
              </ResponsiveContainer>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </ThemeColorProvider>
        {/* <Analytics /> */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
