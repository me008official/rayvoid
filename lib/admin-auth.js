import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export const ADMIN_SESSION_COOKIE = "adminAccessToken"
export const ADMIN_SESSION_TTL_SECONDS = 12 * 60 * 60

export function createAdminSessionToken(phoneNumber) {
  const secret = process.env.SECRET_KEY
  if (!secret) {
    throw new Error("SECRET_KEY is not configured")
  }

  return jwt.sign(
    { role: "admin" },
    secret,
    {
      subject: phoneNumber,
      issuer: "rayvoid-admin",
      audience: "rayvoid-admin",
      expiresIn: ADMIN_SESSION_TTL_SECONDS,
    }
  )
}

export async function verifyAdminSession() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value
  const secret = process.env.SECRET_KEY

  if (!token || !secret) {
    return false
  }

  try {
    const payload = jwt.verify(token, secret, {
      issuer: "rayvoid-admin",
      audience: "rayvoid-admin",
    })

    return (
      typeof payload === "object" &&
      payload.role === "admin" &&
      typeof payload.sub === "string"
    )
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return false
    }

    throw error
  }
}

export function setAdminSessionCookie(response, token) {
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  })
}
