import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HexBg from "./components/HexBg";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 overflow-hidden">

        {/* Hexagon Background */}
        <HexBg />

        {/* Blue background shapes */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-blue-600/70 rotate-[8deg] origin-bottom-left"></div>
        <div className="absolute bottom-0 left-[-40px] w-full h-64 bg-blue-700/80 rotate-[14deg] origin-bottom-left"></div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700">
            ED PHARMA
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Pharmaceutical excellence with globally trusted formulations.
          </p>
          <button className="mt-8 px-10 py-4 bg-blue-600 text-white rounded-xl text-lg shadow-xl hover:bg-blue-700 transition">
            Explore Products
          </button>
        </div>
      </section>

      {/* PRODUCT SLIDER */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-blue-700 text-center">
          Product Categories
        </h2>
        <Slider />
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-10">
          Why Choose ED Pharma?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-6 shadow-xl rounded-xl border">
            <h3 className="text-xl font-bold text-blue-700">Quality Assured</h3>
            <p className="mt-2 text-slate-600">
              All products follow strict pharmaceutical standards.
            </p>
          </div>

          <div className="bg-white p-6 shadow-xl rounded-xl border">
            <h3 className="text-xl font-bold text-blue-700">Global Shipping</h3>
            <p className="mt-2 text-slate-600">
              Export-ready products delivered worldwide.
            </p>
          </div>

          <div className="bg-white p-6 shadow-xl rounded-xl border">
            <h3 className="text-xl font-bold text-blue-700">Trusted Brands</h3>
            <p className="mt-2 text-slate-600">
              Ajanta, Centurion, Sunrise & 20+ pharmaceutical partners.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
