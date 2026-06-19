import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { getUserSession } from "@/lib/core/session";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "HavenStay",
  description:
    "A modern and stylish hotel booking website built with Next.js, offering a seamless user experience for finding and reserving accommodations worldwide.",
};

export default async function RootLayout({ children }) {
  const session = await getUserSession();

  console.log(session?.user);

  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar session={session?.user} />
        <TooltipProvider>
          <main className="flex-1 bg-background">{children}</main>
        </TooltipProvider>
        <Toaster />

        <Footer />
      </body>
    </html>
  );
}
