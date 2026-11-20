import { Geist_Mono, Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import QueryClientProvider from "@/components/query-provider";
import { NextIntlClientProvider } from "next-intl";
import "flag-icons/css/flag-icons.min.css";
import Script from "next/script";

import { Navbar } from "@/components/navbar/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                fontMono.variable,
                "font-sans",
                inter.variable
            )}
        >
            <body className="min-h-dvh">
                <Script src="/runtime-config.js" strategy="beforeInteractive" />

                <NextIntlClientProvider>
                    <ThemeProvider>
                        <QueryClientProvider>
                            <div className="flex h-dvh flex-col overflow-hidden">
                                {/* <Navbar /> */}
                                <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
                                    {children}
                                </main>

                                <Footer />
                            </div>
                        </QueryClientProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
