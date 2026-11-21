import pool from "@/db/db"
import {
  createAdminSessionToken,
  setAdminSessionCookie,
} from "@/lib/admin-auth"
import {
  decryptTruecallerToken,
  isAllowedTruecallerProfile,
  TRUECALLER_ATTEMPT_COOKIE,
} from "@/lib/truecaller-auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

function responseAndClearAttempt(message, status) {
  const response = NextResponse.json({ message }, { status })
  response.cookies.set(TRUECALLER_ATTEMPT_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/truecaller",
    maxAge: 0,
  })
  return response
}

export async function GET() {
  const requestId = (await cookies()).get(TRUECALLER_ATTEMPT_COOKIE)?.value

  if (!requestId) {
    return NextResponse.json(
      { message: "No active Truecaller sign-in." },
      { status: 401 }
    )
  }

  const [attempts] = await pool.query(
    `SELECT status, access_token_encrypted, profile_endpoint
     FROM admin_auth_attempts
     WHERE request_id = ? AND expires_at > UTC_TIMESTAMP() LIMIT 1`,
    [requestId]
  )

  if (!attempts.length) {
    return responseAndClearAttempt("Truecaller sign-in expired.", 401)
  }

  const attempt = attempts[0]
  if (attempt.status === "pending") {
    return NextResponse.json({ status: "pending" }, { status: 202 })
  }

  if (attempt.status === "rejected") {
    return responseAndClearAttempt(
      "The Truecaller account is not authorized for admin access.",
      403
    )
  }

  if (
    attempt.status !== "received" ||
    !attempt.access_token_encrypted ||
    !attempt.profile_endpoint
  ) {
    return responseAndClearAttempt("Truecaller sign-in is no longer valid.", 401)
  }

  let accessToken
  try {
    accessToken = decryptTruecallerToken(attempt.access_token_encrypted)
  } catch (error) {
    console.error("Could not decrypt Truecaller access token:", error)
    return responseAndClearAttempt("Could not verify Truecaller sign-in.", 500)
  }

  let profileResponse
  try {
    profileResponse = await fetch(attempt.profile_endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    })
  } catch (error) {
    console.error("Could not fetch the Truecaller profile:", error)
    return NextResponse.json(
      { message: "Truecaller profile verification is temporarily unavailable." },
      { status: 503 }
    )
  }

  if (!profileResponse.ok) {
    if (profileResponse.status >= 500 || profileResponse.status === 429) {
      return NextResponse.json(
        { message: "Truecaller profile verification is temporarily unavailable." },
        { status: 503 }
      )
    }

    await pool.query(
      `UPDATE admin_auth_attempts
       SET status = 'rejected', access_token_encrypted = NULL
       WHERE request_id = ? AND status = 'received'`,
      [requestId]
    )
    return responseAndClearAttempt(
      "Could not verify the Truecaller account.",
      403
    )
  }

  let profile
  try {
    profile = await profileResponse.json()
  } catch (error) {
    console.error("Invalid Truecaller profile response:", error)
    return NextResponse.json(
      { message: "Could not verify the Truecaller profile." },
      { status: 502 }
    )
  }

  if (!isAllowedTruecallerProfile(profile)) {
    await pool.query(
      `UPDATE admin_auth_attempts
       SET status = 'rejected', access_token_encrypted = NULL
       WHERE request_id = ? AND status = 'received'`,
      [requestId]
    )
    return responseAndClearAttempt(
      "The Truecaller account is not authorized for admin access.",
      403
    )
  }

  if (!process.env.SECRET_KEY) {
    return NextResponse.json(
      { message: "Admin session signing is not configured." },
      { status: 503 }
    )
  }

  const sessionToken = createAdminSessionToken(
    process.env.TRUECALLER_ADMIN_PHONE
  )
  const [result] = await pool.query(
    `UPDATE admin_auth_attempts
     SET status = 'consumed', access_token_encrypted = NULL
     WHERE request_id = ? AND status = 'received'
       AND expires_at > UTC_TIMESTAMP()`,
    [requestId]
  )

  if (!result.affectedRows) {
    return responseAndClearAttempt("Truecaller sign-in expired.", 401)
  }

  const response = NextResponse.json({ authenticated: true })
  response.cookies.set(TRUECALLER_ATTEMPT_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/truecaller",
    maxAge: 0,
  })
  setAdminSessionCookie(response, sessionToken)
  return response
}
