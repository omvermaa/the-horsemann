import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MandatoryModal from "@/components/ui/MandatoryModal";
import GlobalFooter from "@/components/ui/GlobalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Horsemann | Commanding the Digital Realm",
  description: "A luxury digital agency specializing in results-obsessed storytelling and surgical strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative text-white bg-black">
        <MandatoryModal />
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
