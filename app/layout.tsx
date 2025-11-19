import { BACKGROUND } from "@/tokens/colors";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boring Meal Planner",
  description: "Hard-coded meal planner for a sane human being.",
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
