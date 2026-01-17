import { sql, type Project } from "@/lib/db"
import { ProjectCard } from "./project-card"

async function getProjects(): Promise<Project[]> {
  const projects = await sql`
    SELECT * FROM projects 
    WHERE featured = true 
    ORDER BY display_order ASC 
    LIMIT 6
  `
  return projects.map((p: Record<string, unknown>) => ({
    ...p,
    technologies: typeof p.technologies === "string" ? JSON.parse(p.technologies) : p.technologies || [],
  })) as Project[]
}

export async function ProjectsGrid() {
  const projects = await getProjects()

  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glow-text">$ ls projects/</h2>
      <p className="text-muted-foreground mb-12 text-sm">Displaying active repositories</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
