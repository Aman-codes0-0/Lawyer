import { NextRequest, NextResponse } from "next/server";
import { verifyLawyerToken } from "@/lib/lawyer-auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("lawyer_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const payload = await verifyLawyerToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 });
    }

    // Fetch fresh lawyer data from DB
    const lawyer = await prisma.lawyer.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        designation: true,
        specialization: true,
        experience: true,
        education: true,
        barRegistration: true,
        languages: true,
        photoUrl: true,
        isVerified: true,
        createdAt: true,
      },
    });

    if (!lawyer) {
      return NextResponse.json({ error: "Lawyer not found." }, { status: 404 });
    }

    return NextResponse.json({ lawyer }, { status: 200 });
  } catch (error) {
    console.error("[Lawyer Me Error]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
