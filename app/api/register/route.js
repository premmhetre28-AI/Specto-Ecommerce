import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import connectDB from "@/lib/connectDB";

export async function POST(req) {
  try {
    await connectDB();

    const form =
      await req.json();

    if (form.email == "" || form.name== "" || form.password=="") {
      return Response.json({
        success: false,
        message: "Flease fill all fields"
      });
    }

    // check existing user
    const existing =await User.findOne({ email: form.email });

    if (existing) {
      return Response.json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(form.password, 10);

    const user = await User.create({
      name: form.name,
      email: form.email,
      password: hashedPassword,
      role:form.role
    });

    return Response.json({
      success: true,
      message: "Registered successfully",
      user
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: error.message
    });
  }
}