import pool from "@/db/db"
import {
  encryptTruecallerToken,
} from "@/lib/truecaller-auth"
import { NextResponse } from "next/server"

export async function POST(request) {
  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ message: "Invalid callback body." }, { status: 400 })
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ message: "Invalid callback body." }, { status: 400 })
  }

  const { requestId, status, accessToken, endpoint } = payload
  if (
    typeof requestId !== "string" ||
    requestId.length < 8 ||
    requestId.length > 64
  ) {
    return NextResponse.json({ message: "Invalid request ID." }, { status: 400 })
  }

  const [attempts] = await pool.query(
    `SELECT status FROM admin_auth_attempts
     WHERE request_id = ? AND expires_at > UTC_TIMESTAMP() LIMIT 1`,
    [requestId]
  )

  if (!attempts.length || attempts[0].status !== "pending") {
    return NextResponse.json({ message: "Login attempt expired." }, { status: 404 })
  }

  if (status === "flow_invoked") {
    return NextResponse.json({ accepted: true })
  }

  if (status === "user_rejected") {
    await pool.query(
      `UPDATE admin_auth_attempts SET status = 'rejected'
       WHERE request_id = ? AND status = 'pending'`,
      [requestId]
    )
    return NextResponse.json({ accepted: true })
  }

  if (
    typeof accessToken !== "string" ||
    accessToken.length === 0 ||
    accessToken.length > 4096 ||
    typeof endpoint !== "string" ||
    endpoint.length > 512
  ) {
    return NextResponse.json({ message: "Invalid Truecaller response." }, { status: 400 })
  }

  let profileEndpoint
  try {
    profileEndpoint = new URL(endpoint)
  } catch {
    return NextResponse.json({ message: "Invalid profile endpoint." }, { status: 400 })
  }

  if (
    profileEndpoint.protocol !== "https:" ||
    !/^profile4-[a-z0-9-]+\.truecaller\.com$/.test(profileEndpoint.hostname) ||
    profileEndpoint.pathname !== "/v1/default" ||
    profileEndpoint.username ||
    profileEndpoint.password ||
    profileEndpoint.port
  ) {
    return NextResponse.json({ message: "Invalid profile endpoint." }, { status: 400 })
  }

  if (!process.env.SECRET_KEY) {
    return NextResponse.json(
      { message: "Truecaller sign-in is not configured on the server." },
      { status: 503 }
    )
  }

  const encryptedToken = encryptTruecallerToken(accessToken)
  const [result] = await pool.query(
    `UPDATE admin_auth_attempts
     SET status = 'received', access_token_encrypted = ?, profile_endpoint = ?
     WHERE request_id = ? AND status = 'pending'
       AND expires_at > UTC_TIMESTAMP()`,
    [encryptedToken, profileEndpoint.toString(), requestId]
  )

  if (!result.affectedRows) {
    return NextResponse.json({ message: "Login attempt expired." }, { status: 404 })
  }

  return NextResponse.json({ accepted: true })
}
