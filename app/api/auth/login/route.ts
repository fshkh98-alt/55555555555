import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "../../../../lib/prisma";
import { createSession } from "../../../../lib/auth";
import { loginSchema } from "../../../../lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });

    const user = await db.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!valid) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

    await createSession(user.id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }
}