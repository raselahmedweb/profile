import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedName = name.trim().slice(0, 100)
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 255)
    const sanitizedSubject = subject ? subject.trim().slice(0, 200) : null
    const sanitizedMessage = message.trim().slice(0, 5000)

    // Insert into database
    const result = await sql`
      INSERT INTO contact_messages (name, email, subject, message, status)
      VALUES (${sanitizedName}, ${sanitizedEmail}, ${sanitizedSubject}, ${sanitizedMessage}, 'new')
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully",
      id: result[0].id,
    })
  } catch (error) {
    console.error("Error saving contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
