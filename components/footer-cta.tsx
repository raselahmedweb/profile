import Link from "next/link"
import { CONTACT_INFO } from "@/lib/db"

export function FooterCTA() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
      <div className="gradient-border rounded-lg p-12 text-center glow-border">
        <h2 className="text-3xl font-bold text-white mb-4 glow-text">$ init collaboration</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          {
            "Let's build something meaningful together. Whether it's scaling your infrastructure, designing robust APIs, or architecting greenfield systems."
          }
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-all duration-200 font-medium glow-border"
          >
            Initialize Contact
          </Link>
          <Link
            href="/resume"
            className="px-8 py-4 border border-border hover:border-muted-foreground text-foreground rounded transition-all duration-200 font-medium"
          >
            Download Resume
          </Link>
          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-border hover:border-muted-foreground text-foreground rounded transition-all duration-200 font-medium"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
