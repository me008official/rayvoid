import pool from "@/db/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers"


const KEY = process.env.SECRET_KEY

export async function GET(request) {
    const cookieStor = await cookies()
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const pass = searchParams.get("password")

    if (!email || !pass) {
        return NextResponse.json({ message: "Your Field is undefind" })
    }

    const [row] = await pool.query(`SELECT * FROM admin WHERE email = ?`, [email])


    if (!row || !row.length === 0) {
        return NextResponse.json({ message: "Your Email Undefind" })
    }

    const isMatch = await bcrypt.compare( pass,row[0]?.password)
    console.log(isMatch)
    if (!isMatch) {
        return NextResponse.json({ message: "Your Password Undefind" }, { status: 500 })
    }

    const token = await jwt.sign(row[0], KEY, { expiresIn: "24h" })
    cookieStor.set("adminAccesToken", token, {
        path: "/",
        httpOnly: true,
    })
    return NextResponse.json({ message: "User login succesfull" }, { status: 200 })
}