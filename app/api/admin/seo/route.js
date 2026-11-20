import pool from "@/db/db"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { title, slug } = await req.json()

    if (!title && !slug) {
        return NextResponse.json({ message: "Field require" }, { status: 500 })
    }

    const [row] = await pool.query(`INSERT INTO seo VALUE()`, [])




}