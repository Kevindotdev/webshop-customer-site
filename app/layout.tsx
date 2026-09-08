import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CategorySidebarProvider } from "@/components/category-sidebar-provider";
import CategoryService from "@/services/category-service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Webshop",
  description: "Browse our products",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await CategoryService.getAllCategories();

  return (
    <html
      lang="sv"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider>
          <CategorySidebarProvider>
            <Header categories={categories} />
            <div className="flex min-h-screen flex-col">
              <div className="flex-1">
                {children}
              </div>

              <Footer />
            </div>
          </CategorySidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}