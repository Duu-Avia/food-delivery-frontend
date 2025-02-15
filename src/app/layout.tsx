import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LeftSideBar } from "./_components/Leftside-bar";
import { HomeHeader } from "./_components/Home-header";
import { HomeFooter } from "./_components/Home-footer";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <SignedOut>
            <div className="flex justify-center bg-[#EF4444] text-[#FFFFFF] text-[14px]  w-[75px] h-[36px] rounded-full">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>{children}</SignedIn>
        </ClerkProvider>
      </body>
    </html>
  );
}
