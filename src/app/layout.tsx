import type { Metadata } from "next";
import { Archivo_Black, Inter, League_Spartan, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/layout/Navbar";
import { ParticlesBackground } from "@/components/background/ParticlesBackground";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});

const archivoBlack = Archivo_Black({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-archivo-black",
});

const leagueSpartan = League_Spartan({
    subsets: ["latin"],
    variable: "--font-league-spartan",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: {
        default: "Yazid Maulana Rizky — Full Stack Developer",
        template: "%s | Yazid Maulana Rizky",
    },
    description:
        "Portfolio of Yazid Maulana Rizky, a Full Stack Developer and Computer Science student at BINUS University with interest in Cloud Engineering.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full antialiased",
                montserrat.variable,
                archivoBlack.variable,
                leagueSpartan.variable,
                inter.variable,
            )}
        >
            <body className="relative isolate flex min-h-screen flex-col bg-background text-foreground">
                <ParticlesBackground />

                <Navbar />
                <div className="relative z-10 flex min-h-screen flex-col">
                    <main id="main-content" className="flex flex-1 flex-col">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
