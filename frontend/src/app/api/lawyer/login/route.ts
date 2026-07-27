import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signLawyerToken } from "@/lib/lawyer-auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const lawyer = await prisma.lawyer.findUnique({ where: { email } });

    if (!lawyer || !lawyer.password) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, lawyer.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await signLawyerToken({
      id: lawyer.id,
      name: lawyer.name,
      email: lawyer.email!,
      designation: lawyer.designation,
      specialization: lawyer.specialization,
    });

    const response = NextResponse.json(
      {
        message: "Login successful.",
        lawyer: {
          id: lawyer.id,
          name: lawyer.name,
          email: lawyer.email,
          designation: lawyer.designation,
          specialization: lawyer.specialization,
          experience: lawyer.experience,
          barRegistration: lawyer.barRegistration,
          photoUrl: lawyer.photoUrl,
        },
      },
      { status: 200 }
    );

    response.cookies.set("lawyer_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Lawyer Login Error]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
