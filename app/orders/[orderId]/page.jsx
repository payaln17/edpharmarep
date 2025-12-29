"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Clock,
  Truck,
  XCircle,
  MapPin,
  Phone,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

/* ---------- helpers ---------- */
function formatDate(d) {
  try {
    return new Date(d).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function statusMeta(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("pending"))
    return {
      label: "Pending",
      icon: <Clock className="w-3.5 h-3.5" />,
      pill: "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 border-amber-200/50 shadow-xs",
    };
  if (s.includes("processing"))
    return {
      label: "Processing",
      icon: <Package className="w-3.5 h-3.5" />,
      pill: "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 border-blue-200/50 shadow-xs",
    };
  if (s.includes("shipped"))
    return {
      label: "Shipped",
      icon: <Truck className="w-3.5 h-3.5" />,
      pill: "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border-emerald-200/50 shadow-xs",
    };
  if (s.includes("cancel"))
    return {
      label: "Cancelled",
      icon: <XCircle className="w-3.5 h-3.5" />,
      pill: "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-800 border-rose-200/50 shadow-xs",
    };
  return {
    label: status || "Pending",
    icon: <Clock className="w-3.5 h-3.5" />,
    pill: "bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 border-slate-200/50 shadow-xs",
  };
}

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("ORDER PARAM ID:", orderId);


  useEffect(() => {
  let mounted = true;

  (async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("bio-user"));
      if (!user?._id) {
        setError("Please login again");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/orders/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });

      const data = await res.json();
      if (!mounted) return;

      if (!res.ok || !data.ok) {
        setError(data?.message || "Order not found");
        setOrder(null);
        return;
      }

      setOrder(data.order);
    } catch {
      setError("Failed to load order");
    } finally {
      mounted && setLoading(false);
    }
  })();

  return () => {
    mounted = false;
  };
}, [orderId]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50/90 via-white to-blue-50/80">
        <div className="w-8 h-8 border-2 border-blue-200/50 border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50/90 via-white to-blue-50/80">
        <div className="bg-white/95 backdrop-blur-md border border-slate-100/70 rounded-2xl p-8 text-center max-w-sm w-full shadow-xl ring-1 ring-slate-100/50">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-medium text-slate-900 mb-2">
            Order not found
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            The order you are looking for does not exist.
          </p>
          <Link
            href="/orders"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0A4C89]/90 to-[#0A5CA8]/90 px-6 py-3 text-sm font-medium text-white hover:from-[#0A4C89] hover:to-[#0A5CA8] shadow-lg hover:shadow-xl transition-all duration-200 ring-1 ring-[#0A4C89]/20 backdrop-blur-sm"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  const meta = statusMeta(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/95 via-white to-blue-50/80 pt-6 pb-16 -mt-22">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BACK BUTTON */}
        <Link
          href="/orders"
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-[#0A4C89] mb-8 transition-all duration-200 hover:-translate-x-1"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          />
          Back to My Orders
        </Link>

        {/* HEADER */}
        <div className="bg-white/95 backdrop-blur-md border border-slate-100/70 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-slate-100/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">
                Order ID
              </p>
              <h1 className="text-xl font-semibold text-slate-900 leading-tight truncate">
                {order.orderId}
              </h1>
              <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-3 py-1 ${meta.pill} backdrop-blur-sm hover:scale-105 transition-transform duration-150`}
            >
              {meta.icon}
              {meta.label}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ITEMS WITH IMAGES */}
          <section className="space-y-4">
            <div className="bg-white/95 backdrop-blur-md border border-slate-100/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-slate-100/50">
              <h2 className="text-lg font-medium text-slate-900 mb-5 flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-500" />
                Order Items
              </h2>
              <div className="space-y-4">
                {order.items.map((i, index) => (
                  <div
                    key={i.slug}
                    className="group flex gap-4 p-4 rounded-xl border border-slate-100/70 hover:border-slate-200/80 hover:bg-slate-50/50 transition-all duration-200 hover:shadow-md"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                      {i.image ? (
                        <Image
                          src={i.image}
                          alt={i.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          priority={index === 0}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                          <ImageIcon className="w-6 h-6 text-slate-400" />
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-900 text-sm leading-tight group-hover:text-[#0A4C89] transition-colors truncate">
                        {i.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                        <span>Qty:</span>
                        <span className="font-medium text-slate-800">
                          {i.qty}
                        </span>
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right min-w-[72px] flex flex-col items-end">
                      <p className="font-semibold text-slate-900 text-base">
                        ₹{Number(i.price || 0) * Number(i.qty || 0)}
                      </p>
                      <p className="text-xs text-slate-500">
                        per item: ₹{i.price || 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SUMMARY + ADDRESS */}
          <div className="lg:space-y-6 space-y-5">
            {/* SUMMARY */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-100/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-slate-100/50">
              <h2 className="text-lg font-medium text-slate-900 mb-5 flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-500" />
                Summary
              </h2>
              <div className="space-y-3 text-sm divide-y divide-slate-100/50">
                <div className="flex justify-between py-2 pt-0">
                  <span className="text-slate-600">Distinct items</span>
                  <span className="font-medium text-slate-900">
                    {order.totals?.totalDistinct ?? 0}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">Total quantity</span>
                  <span className="font-medium text-slate-900">
                    {order.totals?.totalQty ?? 0}
                  </span>
                </div>
                <div className="flex justify-between pt-4 mt-3 border-t border-slate-200">
                  <span className="font-semibold text-lg text-slate-900">
                    Total
                  </span>
                  <span className="font-bold text-xl text-[#0A4C89]">
                    ₹{order.totals?.totalPrice ?? 0}
                  </span>
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="bg-white/95 backdrop-blur-md border border-slate-100/70 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-slate-100/50">
              <h2 className="text-lg font-medium text-slate-900 mb-5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                Delivery Address
              </h2>
              <div className="space-y-3 text-sm">
                <p className="font-semibold text-slate-900 leading-snug">
                  {order.address?.fullName}
                </p>
                <div className="flex items-start gap-2.5 p-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 rounded-xl border border-blue-100/50">
                  <MapPin className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span className="text-slate-700 leading-relaxed">
                    {order.address?.address}, {order.address?.city} –{" "}
                    {order.address?.pincode}
                    <br />
                    <span className="text-slate-600">
                      {order.address?.country}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-gradient-to-r from-emerald-50/50 to-teal-50/30 rounded-xl border border-emerald-100/50">
                  <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="font-medium text-slate-900">
                    {order.address?.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
