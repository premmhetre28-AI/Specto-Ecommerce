import bcrypt from 'bcryptjs'
import User from "@/app/models/User";
import connectDB from "@/lib/connectDB";
import { generateToken } from '@/lib/jwt';
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        await connectDB();

        const form = await req.json();
        // check existing user
        const user = await User.findOne({ email: form.email });

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            });
        }
        const valid = await bcrypt.compare(form.password, user.password)
        if (!valid) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid password",
                },
                { status: 400 }
            );
        }

        const token = generateToken(user);
        (await cookies()).set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        })

        return Response.json({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        return Response.json({
            success: false,
            message: error.message
        });
    }
}