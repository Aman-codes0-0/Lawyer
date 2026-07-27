import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signLawyerToken } from "@/lib/lawyer-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      designation,
      specialization,
      experience,
      education,
      barRegistration,
      languages,
    } = body;

    // Validate required fields
    if (!name || !email || !password || !designation || !specialization || !experience || !education || !barRegistration) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    // Check if email already taken
    const existing = await prisma.lawyer.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    // Check if barRegistration already claimed
    const existingBar = await prisma.lawyer.findUnique({ where: { barRegistration } });
    if (existingBar && existingBar.email) {
      return NextResponse.json(
        { error: "This bar registration number is already linked to an account." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let lawyer;
    if (existingBar) {
      // Claim existing profile (created by admin) by updating with auth fields
      lawyer = await prisma.lawyer.update({
        where: { barRegistration },
        data: { email, password: hashedPassword, isVerified: false },
      });
    } else {
      // Create fresh lawyer record
      lawyer = await prisma.lawyer.create({
        data: {
          name,
          email,
          password: hashedPassword,
          designation,
          specialization,
          experience: parseInt(experience, 10),
          education,
          barRegistration,
          languages: languages ?? "English",
          isVerified: false,
        },
      });
    }

    // Sign JWT token
    const token = await signLawyerToken({
      id: lawyer.id,
      name: lawyer.name,
      email: lawyer.email!,
      designation: lawyer.designation,
      specialization: lawyer.specialization,
    });

    const response = NextResponse.json(
      { message: "Account created successfully.", lawyer: { id: lawyer.id, name: lawyer.name, email: lawyer.email } },
      { status: 201 }
    );

    // Set httpOnly cookie
    response.cookies.set("lawyer_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Lawyer Register Error]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
