"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const CartDrawer    = dynamic(() => import("./CartDrawer").then(m => ({ default: m.CartDrawer })), { ssr: false });
const SearchOverlay = dynamic(() => import("./SearchOverlay").then(m => ({ default: m.SearchOverlay })), { ssr: false });

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CartDrawer />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
