"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-blue-700">
          ED Pharma
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-slate-700">
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* MOBILE BURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-blue-700 text-3xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}

