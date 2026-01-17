import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const status = searchParams.get("status")
    const limit = searchParams.get("limit") || "10"

    let query = `SELECT * FROM projects WHERE 1=1`
    const params: (string | boolean)[] = []
    let paramIndex = 1

    if (featured === "true") {
      query += ` AND featured = $${paramIndex}`
      params.push(true)
      paramIndex++
    }

    if (status && ["live", "in_progress", "archived"].includes(status)) {
      query += ` AND status = $${paramIndex}`
      params.push(status)
      paramIndex++
    }

    query += ` ORDER BY display_order ASC LIMIT $${paramIndex}`
    params.push(limit)

    const projects = await sql(query, params)

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
