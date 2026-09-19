import type { Metadata } from "next";
import { Inter, Black_Ops_One } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const stencil = Black_Ops_One({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-stencil" 
});

export const metadata: Metadata = {
  title: "VISÃO DE RUA - Lupas Exclusivas DF",
  description: "A RUA INSPIRA, VOCÊ USA. Especialistas em Juliet e Mandrake, pronta entrega em todo o DF.",
  icons: {
    icon: '/images/logo-main.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${stencil.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <CartProvider>
          <div className="bg-blood text-white text-center text-xs sm:text-sm py-2 px-4 font-bold uppercase tracking-wider relative z-50">
            Enviamos para todo o Brasil! Em Brasília (DF), os pedidos são acumulados para entrega conjunta.
          </div>
          <CartSidebar />
          <main className="flex-grow">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
