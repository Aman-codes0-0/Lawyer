import { SignJWT, jwtVerify } from "jose";

const LAWYER_JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET ?? "fallback-lawyer-secret-key-change-me"
);

export interface LawyerJWTPayload {
  id: string;
  name: string;
  email: string;
  designation: string;
  specialization: string;
}

export async function signLawyerToken(payload: LawyerJWTPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(LAWYER_JWT_SECRET);
}

export async function verifyLawyerToken(token: string): Promise<LawyerJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, LAWYER_JWT_SECRET);
    return payload as unknown as LawyerJWTPayload;
  } catch {
    return null;
  }
}
