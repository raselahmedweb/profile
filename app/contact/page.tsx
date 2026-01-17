import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { CONTACT_INFO } from "@/lib/db"
import Link from "next/link"

export const metadata = {
  title: "Contact — Rasel",
  description: "Get in touch for collaboration opportunities",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/" className="text-muted-foreground hover:text-foreground text-sm mb-8 inline-block">
          ← cd ..
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 glow-text">$ init contact_protocol</h1>
        <p className="text-muted-foreground mb-12 text-sm">Establish communication channel</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div className="gradient-border rounded-lg p-6 glow-border">
              <h3 className="text-lg font-semibold text-white mb-4">Connection Points</h3>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-blue-400">[EMAIL]</span>{" "}
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-foreground hover:text-primary">
                    {CONTACT_INFO.email}
                  </a>
                </p>
                <p>
                  <span className="text-green-400">[PHONE]</span>{" "}
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-foreground hover:text-primary">
                    {CONTACT_INFO.phone}
                  </a>
                </p>
                <p>
                  <span className="text-purple-400">[WEBSITE]</span>{" "}
                  <a
                    href={`https://${CONTACT_INFO.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary"
                  >
                    {CONTACT_INFO.website}
                  </a>
                </p>
                <p>
                  <span className="text-cyan-400">[GITHUB]</span>{" "}
                  <a
                    href={CONTACT_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary"
                  >
                    github.com/raselahmedweb
                  </a>
                </p>
              </div>
            </div>

            <div className="gradient-border rounded-lg p-6 glow-border">
              <h3 className="text-lg font-semibold text-white mb-4">Response Time</h3>
              <p className="text-muted-foreground text-sm">
                I typically respond within 24-48 hours. For urgent matters, please mention it in your message subject.
              </p>
            </div>

            <div className="gradient-border rounded-lg p-6 glow-border">
              <h3 className="text-lg font-semibold text-white mb-4">{"What I'm Looking For"}</h3>
              <ul className="text-muted-foreground text-sm space-y-2">
                <li>• Full-stack development projects</li>
                <li>• Mobile app development (React Native)</li>
                <li>• API architecture consulting</li>
                <li>• Open source collaboration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
