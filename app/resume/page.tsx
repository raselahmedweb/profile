import Link from "next/link";
import { Footer } from "@/components/footer";
import { Download } from "lucide-react";

export const metadata = {
  title: "Resume — Rasel Ahmed",
  description: "Professional experience and qualifications",
};

const experience = [
  {
    title: "Full-Stack Developer",
    company: "GEEKSBLOCK.",
    period: "2024 - Present",
    description:
      "Leading development of enterprise-scale applications, architecting microservices, and mentoring other developers.",
    highlights: [
      "Reduced API response times by 60%",
      "Led migration to Kubernetes",
      "Established CI/CD best practices",
    ],
  },
  {
    title: "Website Developer",
    company: "Rawafid Al Bayt",
    period: "2023",
    description:
      "Built and maintained web applications for taxi management, ride sharing, user experience and booking.",
    highlights: [
      "Shipped 3 major products",
      "Implemented real-time features",
      "Grew user base to 100k+",
    ],
  },
  {
    title: "Founder & Lead Developer",
    company: "Innovensky Softwares",
    period: "2020 - 2023",
    description:
      "Founded a software development company specializing in custom web solutions for small businesses.",
    highlights: [
      "Developed 20+ client projects",
      "Managed a team of 5 developers",
    ],
  },
];

export default function ResumePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground text-sm mb-8 inline-block"
        >
          ← cd ..
        </Link>

        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 glow-text">
              $ cat resume.json
            </h1>
            <p className="text-muted-foreground text-sm">
              Professional experience
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-all duration-200 text-sm font-medium glow-border">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        <div className="gradient-border rounded-lg p-8 glow-border mb-12">
          <h2 className="text-blue-400 font-semibold mb-6 text-sm uppercase tracking-wider">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-6 border-l border-border">
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary"></div>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {job.company} · {job.period}
                  </p>
                </div>
                <p className="text-foreground mb-3">{job.description}</p>
                <ul className="space-y-1">
                  {job.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground text-sm flex items-center gap-2"
                    >
                      <span className="text-green-400">→</span> {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="gradient-border rounded-lg p-8 glow-border mb-12">
          <h2 className="text-green-400 font-semibold mb-6 text-sm uppercase tracking-wider">
            Education
          </h2>
          <div className="pl-6 border-l border-border">
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-green-500"></div>
            <h3 className="text-lg font-semibold text-white">
              B.S. Computer Science
            </h3>
            <p className="text-muted-foreground text-sm">
              University of Technology · 2014 - 2018
            </p>
            <p className="text-foreground mt-2">
              Focus on distributed systems and software engineering. Graduated
              with honors.
            </p>
          </div>
        </div>

        <div className="gradient-border rounded-lg p-8 glow-border">
          <h2 className="text-purple-400 font-semibold mb-6 text-sm uppercase tracking-wider">
            Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/30 rounded">
              <p className="text-white font-medium">AWS Solutions Architect</p>
              <p className="text-muted-foreground text-sm">
                Amazon Web Services · 2023
              </p>
            </div>
            <div className="p-4 bg-secondary/30 rounded">
              <p className="text-white font-medium">Kubernetes Administrator</p>
              <p className="text-muted-foreground text-sm">CNCF · 2022</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
