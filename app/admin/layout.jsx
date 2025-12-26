"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ===== MOBILE OVERLAY ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          h-full md:h-auto
          w-64
          bg-white
          border-r
          z-40
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="h-14 flex items-center px-4 border-b font-semibold">
          EdPharma Admin
        </div>

        {/* Sidebar Links */}
        <nav className="p-3 space-y-1 text-sm">
          <Link
            href="/admin"
            className="block px-3 py-2 rounded hover:bg-slate-100"
            onClick={() => setSidebarOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            className="block px-3 py-2 rounded hover:bg-slate-100"
            onClick={() => setSidebarOpen(false)}
          >
            Orders
          </Link>

          <Link
            href="/admin/products"
            className="block px-3 py-2 rounded hover:bg-slate-100"
            onClick={() => setSidebarOpen(false)}
          >
            Products
          </Link>

          <Link
            href="/admin/users"
            className="block px-3 py-2 rounded hover:bg-slate-100"
            onClick={() => setSidebarOpen(false)}
          >
            Users
          </Link>
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TOP BAR (MOBILE HEADER) */}
        <header className="h-14 bg-white border-b flex items-center px-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-xl mr-3"
            aria-label="Open Menu"
          >
            ☰
          </button>
          <span className="font-semibold">EdPharma Admin</span>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}