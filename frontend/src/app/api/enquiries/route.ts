import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name,
        email,
        phone: phone || "",
        subject,
        message,
      },
    });

    return NextResponse.json(enquiry, { status: 201 });
  } catch (error) {
    console.error("Enquiry creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const enquiries = await prisma.contactEnquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
