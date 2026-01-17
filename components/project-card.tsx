import Link from "next/link";
import type { Project } from "@/lib/db";

const statusColors = {
  live: "status-live",
  in_progress: "status-progress",
  archived: "status-archived",
};

const techColorSchemes: Record<string, { bg: string; text: string }> = {
  "Next.js": { bg: "bg-blue-500/10", text: "text-blue-400" },
  PostgreSQL: { bg: "bg-blue-500/10", text: "text-blue-400" },
  Stripe: { bg: "bg-blue-500/10", text: "text-blue-400" },
  React: { bg: "bg-green-500/10", text: "text-green-400" },
  "Node.js": { bg: "bg-green-500/10", text: "text-green-400" },
  GraphQL: { bg: "bg-green-500/10", text: "text-green-400" },
  TypeScript: { bg: "bg-purple-500/10", text: "text-purple-400" },
  MongoDB: { bg: "bg-purple-500/10", text: "text-purple-400" },
  Redis: { bg: "bg-purple-500/10", text: "text-purple-400" },
  Go: { bg: "bg-cyan-500/10", text: "text-cyan-400" },
  TimescaleDB: { bg: "bg-cyan-500/10", text: "text-cyan-400" },
  Kafka: { bg: "bg-cyan-500/10", text: "text-cyan-400" },
  Rust: { bg: "bg-orange-500/10", text: "text-orange-400" },
  WebAuthn: { bg: "bg-orange-500/10", text: "text-orange-400" },
  Python: { bg: "bg-gray-500/10", text: "text-gray-400" },
  Airflow: { bg: "bg-gray-500/10", text: "text-gray-400" },
  Spark: { bg: "bg-gray-500/10", text: "text-gray-400" },
};

function getTechColors(tech: string) {
  return (
    techColorSchemes[tech] || { bg: "bg-blue-500/10", text: "text-blue-400" }
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : [];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="gradient-border rounded-lg p-6 hover:scale-105 transition-transform duration-300 glow-border cursor-pointer block"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <span
          className={`${statusColors[project.status]} w-2 h-2 rounded-full`}
        ></span>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {technologies.slice(0, 3).map((tech) => {
          const colors = getTechColors(tech);
          return (
            <span
              key={tech}
              className={`px-2 py-1 ${colors.bg} ${colors.text} rounded text-xs`}
            >
              {tech}
            </span>
          );
        })}
      </div>
    </Link>
  );
}
