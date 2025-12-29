"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Download } from "lucide-react";
import { useState, useEffect } from "react";

import { useCart } from "./CartContext";
import LoginPopup from "./LoginPopup";

/* ================= NAVBAR ================= */

export default function Navbar() {
  useEffect(() => {
    const storedUser = localStorage.getItem("bio-user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username || user.name || "User");
    }
  }, []);

  const router = useRouter();
  const { cartItems } = useCart();

  /* ---------- STATES ---------- */
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [username, setUsername] = useState("");

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  /* ---------- HANDLERS ---------- */
  const handleLoginSuccess = (user) => {
    localStorage.setItem("bio-user", JSON.stringify(user));
    setUsername(user.username || "User");
    setIsPopupOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("bio-user");
    setUsername("");
    setProfileMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-[1000]">
        <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img
              src="/EdLogo.svg"
              alt="ED Pharma"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center gap-10 text-slate-700 font-medium">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/terms">Terms</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/orders">My Orders</NavLink>

            {/* ✅ DOWNLOAD PDF BUTTON */}
            <a
              href="/ED.pdf"
              download
              className="flex items-center gap-2 px-3 py-1.5 border border-blue-600 text-blue-700 rounded-full hover:bg-blue-50 transition"
            >
              <Download size={16} />
              Download PDF
            </a>

            {/* CART */}
            <button
              onClick={() => router.push("/cart")}
              className="relative text-2xl"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            {/* LOGIN / PROFILE */}
            {username ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen((p) => !p)}
                  className="px-4 py-1.5 rounded-full border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50"
                >
                  Hi! {username}
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border z-[999]">
                    <Link
                      href="/orders"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Orders
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsPopupOpen(true)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Log In
              </button>
            )}
          </div>

          {/* ================= MOBILE ================= */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => router.push("/cart")}
              className="relative text-2xl text-blue-700"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-2 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => setMenuOpen(true)} className="text-blue-700">
              <Menu size={30} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-[999]"
          />

          <div className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-white z-[1001] shadow-xl p-6 flex flex-col gap-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end text-blue-700"
            >
              <X size={26} />
            </button>

            <MobileLink href="/" onClick={() => setMenuOpen(false)}>
              Home
            </MobileLink>
            <MobileLink href="/products" onClick={() => setMenuOpen(false)}>
              Products
            </MobileLink>
            <MobileLink href="/about" onClick={() => setMenuOpen(false)}>
              About
            </MobileLink>
            <MobileLink href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </MobileLink>
            <MobileLink href="/orders" onClick={() => setMenuOpen(false)}>
              My Orders
            </MobileLink>

            {/* ✅ MOBILE DOWNLOAD */}
            <a
              href="/public/ED.pdf"
              download
              className="flex items-center gap-2 text-blue-700 font-semibold"
            >
              <Download size={18} />
              Download PDF
            </a>

            {!username && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setIsPopupOpen(true);
                }}
                className="text-blue-600 font-semibold text-left"
              >
                Log In
              </button>
            )}
          </div>
        </>
      )}

      <div className="h-[64px]" />

      {/* ================= LOGIN MODAL ================= */}
      <LoginPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

/* ================= HELPERS ================= */

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="relative hover:text-blue-600 transition
        after:absolute after:left-0 after:-bottom-1
        after:h-[2px] after:w-0 after:bg-blue-600
        after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-lg font-semibold text-blue-700 hover:text-blue-500 transition"
    >
      {children}
    </Link>
  );
}
