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
  Copy,
  CheckCircle2,
  FolderGit2,
} from "lucide-react";

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
    project.repo_url?.split("/").pop()?.replace(".git", "") || project.slug;

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
        `git clone ${project.repo_url}`,
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
        `git clone ${project.repo_url}`,
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
      `git clone ${project.repo_url}`,
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
    title: `${project.title} — Portfolio`,
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
    <main className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/#projects"
          className="text-gray-400 hover:text-white text-sm mb-8 inline-block transition-colors"
        >
          ← cd ../projects
        </Link>

        {/* Project Header */}
        <div className="bg-[#12121a] border border-gray-800 rounded-lg p-8 sm:p-12 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                $ cat {project.slug}/README.md
              </h1>
              <p className="text-gray-400 text-sm">Project documentation</p>
            </div>

            <Link href={project.url || "#"} className="flex items-center gap-2">
              <span className={`${status.class} w-2 h-2 rounded-full`}></span>
              <span className="text-sm text-gray-400">
                {project.type === "mobile" ? "Install" : status.text}
              </span>
            </Link>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                {project.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </a>
              )}
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-gray-500 text-white rounded-lg transition-all duration-200 text-sm font-medium hover:bg-gray-800/50"
                >
                  <Github className="w-4 h-4" />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>

        {/* GitHub Repository Finder Section */}
        {project.repo_url && (
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-blue-500/30 rounded-lg p-8 sm:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <FolderGit2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Find the Repository
                </h2>
                <p className="text-gray-400 text-sm">
                  Access the source code on GitHub
                </p>
              </div>
            </div>

            <div className="bg-[#0d0d12] rounded-lg p-4 border border-gray-800 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-gray-400" />
                  <code className="text-blue-400 text-sm sm:text-base break-all">
                    {project.repo_url}
                  </code>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <Github className="w-4 h-4" />
                Open Repository
              </a>
              <a
                href={`${project.repo_url}/archive/refs/heads/main.zip`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600/20 border border-green-500/30 text-green-300 hover:bg-green-600/30 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download ZIP
              </a>
            </div>
          </div>
        )}

        {/* Installation Guide */}
        {project.repo_url && (
          <div className="bg-[#12121a] border border-gray-800 rounded-lg p-8 sm:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Terminal className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Installation Guide
                </h2>
                <p className="text-gray-400 text-sm">
                  Follow these steps to run locally
                </p>
              </div>
            </div>

            {/* Quick Start Steps */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                Quick Start Steps
              </h3>
              <div className="space-y-3">
                {installGuide.steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 bg-[#0d0d12] rounded-lg border border-gray-800"
                  >
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full text-sm font-mono">
                      {index + 1}
                    </span>
                    <span className="text-gray-300 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Commands */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-400" />
                Terminal Commands
              </h3>
              <div className="bg-[#0d0d12] rounded-lg border border-gray-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">
                    terminal
                  </span>
                </div>
                <div className="p-4 space-y-2 font-mono text-sm">
                  {installGuide.commands.map((cmd, index) => (
                    <div key={index} className="flex items-center gap-2 group">
                      <span className="text-green-400">$</span>
                      <code className="text-gray-300 flex-1">{cmd}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prerequisites Note */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                <span className="font-semibold">Prerequisites:</span> Make sure
                you have Node.js (v18+) and npm installed on your machine.
                {isReactNative &&
                  " For React Native projects, you'll also need the Expo Go app on your mobile device."}
              </p>
            </div>
          </div>
        )}

        {/* APK Download for React Native */}
        {isReactNative && (
          <div className="bg-[#12121a] border border-gray-800 rounded-lg p-8 sm:p-12 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Smartphone className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Mobile App Downloads
                </h2>
                <p className="text-gray-400 text-sm">
                  Get the app on your device
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Android APK */}
              <div className="bg-[#0d0d12] rounded-lg p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <Download className="w-5 h-5 text-green-400" />
                  <h3 className="text-white font-semibold">Android APK</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
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
              <div className="bg-[#0d0d12] rounded-lg p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-semibold">
                    iOS (Development)
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  No production build available for iOS. Run the project locally
                  and use Expo Go:
                </p>
                <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                  <li>Install Expo Go from App Store</li>
                  <li>Clone and run the project</li>
                  <li>Scan QR code with Expo Go</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Contact for Support */}
        <div className="bg-[#12121a] border border-gray-800 rounded-lg p-6 mb-12">
          <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Having trouble setting up this project? Feel free to reach out:
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {CONTACT_INFO.email}
            </a>
            <span className="text-gray-600">|</span>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              {CONTACT_INFO.phone}
            </a>
            <span className="text-gray-600">|</span>
            <a
              href={`https://${CONTACT_INFO.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {CONTACT_INFO.website}
            </a>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">$ ls ../</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.slug}`}
                  className="bg-[#12121a] border border-gray-800 rounded-lg p-4 hover:scale-105 hover:border-gray-700 transition-all duration-300 block"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">
                    {relatedProject.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2">
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
