import pool from "@/db/db"
import { verifyAdminSession } from "@/lib/admin-auth"
import { genrateSlug } from "@/lib/slug"
import { NextResponse } from "next/server"
import { v4 } from "uuid"

export async function POST(req) {
    if (!(await verifyAdminSession())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { title, description } = await req.json()

    if (!title && !description) {
        return NextResponse.json({ message: "Field require" }, { status: 500 })
    }

    const uuid = v4()
    const slug = await genrateSlug(title)
    const currentDate = Date.now()

    const [findExistingSlug] = await pool.query(`SELECT * FROM seo WHERE slug = ? `,[slug])
    if(findExistingSlug.length > 0) {
        return NextResponse.json({message: "slug already have"},{status:200})
    }
    const [row] = await pool.query(`INSERT INTO seo (id, title, slug, date, description) VALUE(?, ?, ?, ?, ?)`,[uuid,title,slug,currentDate,description])

    if (!row) {
        return NextResponse.json({ message: "Data not saved" }, { status: 500 })
    }

    return NextResponse.json({ message: "Data add succesfull" }, { status: 200 })
}

export async function GET() {
    if (!(await verifyAdminSession())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const [rows] = await pool.query(
            `SELECT * FROM seo ORDER BY date DESC`
        );

        return NextResponse.json({ data: rows }, { status: 200 });
    } catch (error) {
        console.error("GET /api/seo error:", error);
        return NextResponse.json(
            { message: "Failed to fetch SEO data" },
            { status: 500 }
        );
    }
}