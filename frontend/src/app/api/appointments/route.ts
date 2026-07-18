import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, caseType, date, time, message } = body;

    if (!name || !phone || !email || !caseType || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientName: name,
        phone,
        email,
        caseType,
        preferredDate: new Date(date),
        preferredTime: time,
        message,
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
