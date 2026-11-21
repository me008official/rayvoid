import pool from "@/db/db"
import {
  normalizePhoneNumber,
  TRUECALLER_ATTEMPT_COOKIE,
  TRUECALLER_ATTEMPT_TTL_SECONDS,
} from "@/lib/truecaller-auth"
import { randomBytes } from "node:crypto"
import { NextResponse } from "next/server"

export async function POST() {
  if (
    !process.env.TRUECALLER_APP_KEY ||
    !normalizePhoneNumber(process.env.TRUECALLER_ADMIN_PHONE) ||
    !process.env.SECRET_KEY
  ) {
    return NextResponse.json(
      { message: "Truecaller sign-in is not configured on the server." },
      { status: 503 }
    )
  }

  const requestId = randomBytes(32).toString("base64url")
  await pool.query(
    "DELETE FROM admin_auth_attempts WHERE expires_at <= UTC_TIMESTAMP()"
  )
  await pool.query(
    `INSERT INTO admin_auth_attempts (request_id, status, expires_at)
     VALUES (?, 'pending', DATE_ADD(UTC_TIMESTAMP(), INTERVAL 10 MINUTE))`,
    [requestId]
  )

  const response = NextResponse.json({ requestNonce: requestId })
  response.cookies.set(TRUECALLER_ATTEMPT_COOKIE, requestId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/truecaller",
    maxAge: TRUECALLER_ATTEMPT_TTL_SECONDS,
  })

  return response
}
