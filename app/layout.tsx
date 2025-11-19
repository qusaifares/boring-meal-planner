import { BACKGROUND } from "@/tokens/colors";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boring Meal Planner",
  description: "Hard-coded meal planner for a sane human being.",
  manifest: "/manifest.json",
  
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Boring Meal Planner",
  },

  icons: {
    icon: [
      { url: "/icons/192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/icons/192x192.png", sizes: "192x192", type: "image/png" }
    ]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, system-ui, -system-ui, sans-serif",
          background: BACKGROUND,
          color: "#f9fafb",
        }}
      >
        {children}
      </body>
    </html>
  );
}
