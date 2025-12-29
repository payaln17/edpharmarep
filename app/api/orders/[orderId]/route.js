import dbConnect from "@/lib/db";
import Order from "../../../models/Order";
import { NextResponse } from "next/server";

/* ================= ORDER DETAILS (POST) ================= */
export async function POST(req, ctx) {
  try {
    await dbConnect();

    // ✅ FIX: params is Promise in Next.js 16
    const { orderId } = await ctx.params;
    const { userId } = await req.json();

    console.log("API PARAM orderId:", orderId);
    console.log("API BODY userId:", userId);

    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    const order = await Order.findOne({
      _id: orderId,
      userId: userId,
    }).lean();

    if (!order) {
      return NextResponse.json(
        { ok: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, order });
  } catch (err) {
    console.error("ORDER_DETAILS_ERROR:", err);
    return NextResponse.json(
      { ok: false, message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

/* ================= TEST GET (OPTIONAL) ================= */
export async function GET(req, ctx) {
  const { orderId } = await ctx.params;

  console.log("✅ GET API HIT");
  console.log("GET PARAM orderId:", orderId);

  return NextResponse.json({
    ok: true,
    orderId,
  });
}
