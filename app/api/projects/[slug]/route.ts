import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    const projects = await sql`
      SELECT * FROM projects WHERE slug = ${slug}
    `

    if (projects.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ project: projects[0] })
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}
