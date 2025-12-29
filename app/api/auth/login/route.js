import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/app/models/User";


export async function POST(req) {
  const { email, password } = await req.json();
  await dbConnect();

  // 🔥 ADMIN LOGIN
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({
      success: true,
      user: {
        email,
        role: "admin",
      },
    });
  }

  // 🔒 NORMAL USER
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    user: {
      email: user.email,
      role: user.role,
    },
  });
}




// import dbConnect from "@/lib/db";
// import User from "../../../models/User";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     await dbConnect();

//     const { email, password } = await request.json();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 404 }
//       );
//     }

//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) {
//       return NextResponse.json(
//         { success: false, message: "Invalid credentials" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({
//   success: true,
//   user: {
//     _id: user._id.toString(), // ✅ Mongo ID
//     username: user.username,
//     email: user.email,
//   },
// });


//   } catch (err) {
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }
