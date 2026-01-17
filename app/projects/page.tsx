import Link from "next/link";
import { sql, type Project } from "@/lib/db";
import { ProjectCard } from "@/components/project-card";
import { Footer } from "@/components/footer";

async function getAllProjects(): Promise<Project[]> {
  const projects = await sql`
    SELECT * FROM projects 
    ORDER BY display_order ASC
  `;
  return projects as Project[];
}

export const metadata = {
  title: "Projects — Rasel",
  description: "Browse all projects and repositories",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const liveProjects = projects.filter((p) => p.status === "live");
  const inProgressProjects = projects.filter((p) => p.status === "in_progress");
  const archivedProjects = projects.filter((p) => p.status === "archived");

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground text-sm mb-8 inline-block"
        >
          ← cd ..
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 glow-text">
          $ ls -la projects/
        </h1>
        <p className="text-muted-foreground mb-12 text-sm">
          Complete project archive
        </p>

        {liveProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-green-400 font-semibold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="status-live w-2 h-2 rounded-full"></span>
              Live ({liveProjects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {inProgressProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-yellow-400 font-semibold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="status-progress w-2 h-2 rounded-full"></span>
              In Progress ({inProgressProjects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {archivedProjects.length > 0 && (
          <div>
            <h2 className="text-gray-400 font-semibold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="status-archived w-2 h-2 rounded-full"></span>
              Archived ({archivedProjects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
