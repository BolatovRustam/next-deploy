import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/layout/header";
import { siteConfig } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";
import AppLoader from "@/hoc/app-loader";
import Title from "@/components/UI/layout/title";
import { Toast } from "@heroui/react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth()

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen flex flex-col ">
        <SessionProvider session={session}>
          <AppLoader>
            <Toast.Provider />
            <div className="flex min-h-screen flex-col justify-between">
              <div className="flex flex-col">
                <Header />
                  <main className={`flex flex-col w-[ 1024px ] mx-auto px-[ 24px ] justify-start items-center `}
                  >
                    <Title/>
                    {children}
                  </main>
              </div>
                <footer className={`w-full flex items-center justify-center py-3`}
                  style={{height: layoutConfig.footerHeight}}
                >
                  <p>{siteConfig.description}</p> 
                </footer>
            </div>
            </AppLoader>
          </SessionProvider>
      </body>
      
    </html>
    
  );
}
