"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type FormStatus = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  if (status === "success") {
    return (
      <div className="gradient-border rounded-lg p-8 glow-border text-center">
        <div className="text-green-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Message Transmitted</h3>
        <p className="text-muted-foreground mb-6">{"I'll get back to you as soon as possible."}</p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          className="border-border hover:border-muted-foreground"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="gradient-border rounded-lg p-8 glow-border space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-blue-400">
          [NAME]*
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your identifier"
          className="bg-secondary/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-green-400">
          [EMAIL]*
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="bg-secondary/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-purple-400">
          [SUBJECT]
        </Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          className="bg-secondary/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-orange-400">
          [MESSAGE]*
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Describe your project or inquiry..."
          className="bg-secondary/50 border-border focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
        />
      </div>

      {status === "error" && (
        <div className="text-destructive text-sm p-3 bg-destructive/10 rounded border border-destructive/30">
          Error: {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-border"
      >
        {status === "loading" ? "Transmitting..." : "$ send --message"}
      </Button>
    </form>
  )
}
