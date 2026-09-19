"use client";

import React from "react";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems: itemCount, setIsCartOpen } = useCart();

  return (
    <nav className="bg-background border-b border-graphite sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Search className="h-8 w-8 text-blood group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <span className="font-stencil text-2xl tracking-widest text-white leading-none">
                VISÃO DE RUA
              </span>
              <span className="text-[10px] text-gray-400 tracking-[0.2em] font-sans">
                A RUA INSPIRA, VOCÊ USA.
              </span>
            </div>
          </Link>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <span className="hidden sm:inline font-stencil text-sm">BALAIO</span>
            <div className="relative">
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blood text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
