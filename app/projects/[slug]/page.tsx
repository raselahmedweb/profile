import { notFound } from "next/navigation";
import Link from "next/link";
import { sql, type Project, CONTACT_INFO } from "@/lib/db";
import { Footer } from "@/components/footer";
import {
  ExternalLink,
  Github,
  Download,
  Terminal,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DownloadApk from "@/components/helper/download-apk";

async function getProject(slug: string): Promise<Project | null> {
  const projects = await sql`
    SELECT * FROM projects WHERE slug = ${slug}
  `;
  if (projects.length === 0) return null;

  const project = projects[0] as Project;
  // Parse technologies if it's a string
  if (typeof project.technologies === "string") {
    try {
      project.technologies = JSON.parse(project.technologies);
    } catch {
      project.technologies = [];
    }
  }
  return project;
}

async function getRelatedProjects(currentSlug: string): Promise<Project[]> {
  const projects = await sql`
    SELECT * FROM projects 
    WHERE slug != ${currentSlug} 
    AND featured = true 
    ORDER BY display_order ASC 
    LIMIT 3
  `;
  return (projects as Project[]).map((p) => ({
    ...p,
    technologies:
      typeof p.technologies === "string"
        ? JSON.parse(p.technologies)
        : p.technologies || [],
  }));
}

const statusLabels = {
  live: { text: "Live", class: "bg-green-500" },
  in_progress: { text: "In Progress", class: "bg-yellow-500" },
  archived: { text: "Archived", class: "bg-gray-500" },
};

const techColorSchemes: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  "Next.js": {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-300",
  },
  React: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-300",
  },
  "React Native": {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-300",
  },
  Expo: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-300",
  },
  "Node.js": {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-300",
  },
  Express: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-300",
  },
  MongoDB: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-300",
  },
  TypeScript: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-300",
  },
  "Tailwind CSS": {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-300",
  },
  Firebase: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-300",
  },
  Redux: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-300",
  },
  JWT: {
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    text: "text-pink-300",
  },
  Mongoose: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-300",
  },
  Leaflet: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-300",
  },
  "Chart.js": {
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    text: "text-pink-300",
  },
};

function getTechColors(tech: string) {
  return (
    techColorSchemes[tech] || {
      bg: "bg-gray-500/10",
      border: "border-gray-500/30",
      text: "text-gray-300",
    }
  );
}

// Installation guides based on project type
function getInstallationGuide(project: Project): {
  steps: string[];
  commands: string[];
} {
  const repoName =
    project.github_url?.split("/").pop()?.replace(".git", "") || project.slug;

  // Check if it's a React Native project
  const isReactNative =
    project.technologies?.includes("React Native") ||
    project.technologies?.includes("Expo");
  const isBackend =
    project.technologies?.includes("Express") ||
    (project.technologies?.includes("Node.js") &&
      !project.technologies?.includes("React"));

  if (isReactNative) {
    return {
      steps: [
        "Clone the repository",
        "Install dependencies",
        "Install Expo CLI globally (if not installed)",
        "Start the development server",
        "Scan QR code with Expo Go app on your device",
      ],
      commands: [
        `git clone ${project.github_url}`,
        `cd ${repoName}`,
        "npm install",
        "npm install -g expo-cli",
        "npx expo start",
      ],
    };
  }

  if (isBackend) {
    return {
      steps: [
        "Clone the repository",
        "Install dependencies",
        "Set up environment variables",
        "Start the development server",
      ],
      commands: [
        `git clone ${project.github_url}`,
        `cd ${repoName}`,
        "npm install",
        "cp .env.example .env",
        "npm run dev",
      ],
    };
  }

  // Default for web projects
  return {
    steps: [
      "Clone the repository",
      "Install dependencies",
      "Set up environment variables (if needed)",
      "Start the development server",
      "Open in browser",
    ],
    commands: [
      `git clone ${project.github_url}`,
      `cd ${repoName}`,
      "npm install",
      "npm run dev",
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Rasel`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(slug);
  const status = statusLabels[project.status];
  const installGuide = getInstallationGuide(project);
  const isReactNative =
    project.technologies?.includes("React Native") ||
    project.technologies?.includes("Expo");
  const technologies = project.technologies || [];

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/#projects"
          className="text-muted-foreground hover:text-foreground text-sm mb-8 inline-block"
        >
          ← cd ../projects
        </Link>

        {/* Project Header */}
        <div className="gradient-border rounded-lg p-8 sm:p-12 glow-border mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 glow-text">
                $ cat {project.slug}/README.md
              </h1>
              <p className="text-muted-foreground text-sm">
                Project documentation
              </p>
            </div>
            {project.type == "mobile" ? (
              <DownloadApk statusClass={status.class} />
            ) : (
              <Link
                href={project.url || "#"}
                className="flex items-center gap-2"
              >
                <span className={`${status.class} w-2 h-2 rounded-full`}></span>
                <span className="text-sm text-muted-foreground">
                  {status.text}
                </span>
              </Link>
            )}
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent my-6"></div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                {project.title}
              </h2>
              <p className="text-foreground leading-relaxed">
                {project.long_description || project.description}
              </p>
            </div>

            <div>
              <h3 className="text-blue-400 font-semibold mb-3 text-sm uppercase tracking-wider">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => {
                  const colors = getTechColors(tech);
                  return (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 ${colors.bg} border ${colors.border} ${colors.text} rounded-full text-sm`}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-all duration-200 text-sm font-medium glow-border"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-muted-foreground text-foreground rounded transition-all duration-200 text-sm font-medium"
                >
                  <Github className="w-4 h-4" />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Installation Guide */}
        {project.github_url && (
          <div className="gradient-border rounded-lg p-8 sm:p-12 glow-border mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-white glow-text">
                $ ./install.sh
              </h2>
            </div>

            <p className="text-muted-foreground mb-6 text-sm">
              Follow these steps to run this project on your local machine:
            </p>

            <div className="space-y-4">
              {installGuide.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span className="text-blue-400 font-mono text-sm min-w-[24px]">
                    {index + 1}.
                  </span>
                  <span className="text-foreground text-sm">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#0d0d12] rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground font-mono">
                  terminal
                </span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                {installGuide.commands.map((cmd, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <span className="text-green-400">$</span>
                    <code className="text-foreground flex-1">{cmd}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                <span className="font-semibold">Note:</span> Make sure you have
                Node.js (v18+) and npm installed on your machine.
                {isReactNative &&
                  " For React Native projects, you'll also need the Expo Go app on your mobile device."}
              </p>
            </div>
          </div>
        )}

        {/* APK Download for React Native */}
        {isReactNative && (
          <div className="gradient-border rounded-lg p-8 sm:p-12 glow-border mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Smartphone className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white glow-text">
                $ download --mobile
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Android APK */}
              <div className="bg-[#0d0d12] rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Download className="w-5 h-5 text-green-400" />
                  <h3 className="text-white font-semibold">Android APK</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Download and install the APK directly on your Android device.
                </p>
                <a
                  href={`/downloads/${project.slug}.apk`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded hover:bg-green-500/30 transition-all duration-200 text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Download APK
                </a>
              </div>

              {/* iOS Instructions */}
              <div className="bg-[#0d0d12] rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-semibold">
                    iOS (Development)
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  No production build available for iOS. Run the project locally
                  and use Expo Go:
                </p>
                <ol className="text-sm text-foreground space-y-2 list-decimal list-inside">
                  <li>Install Expo Go from App Store</li>
                  <li>Clone and run the project</li>
                  <li>Scan QR code with Expo Go</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Contact for Support */}
        <div className="gradient-border rounded-lg p-6 glow-border mb-12">
          <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Having trouble setting up this project? Feel free to reach out:
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-blue-400 hover:text-blue-300"
            >
              {CONTACT_INFO.email}
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="text-green-400 hover:text-green-300"
            >
              {CONTACT_INFO.phone}
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href={`https://${CONTACT_INFO.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              {CONTACT_INFO.website}
            </a>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 glow-text">
              $ ls ../
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.slug}`}
                  className="gradient-border rounded-lg p-4 hover:scale-105 transition-transform duration-300 glow-border block"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">
                    {relatedProject.title}
                  </h3>
                  <p className="text-muted-foreground text-xs line-clamp-2">
                    {relatedProject.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
