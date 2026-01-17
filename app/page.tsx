import { HeroTerminal } from "@/components/hero-terminal"
import { ProjectsGrid } from "@/components/projects-grid"
import { TechStack } from "@/components/tech-stack"
import { Philosophy } from "@/components/philosophy"
import { FooterCTA } from "@/components/footer-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <HeroTerminal />
      <ProjectsGrid />
      <TechStack />
      <Philosophy />
      <FooterCTA />
      <Footer />
    </main>
  )
}
