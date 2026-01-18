import Link from "next/link";

export function HeroTerminal() {
  return (
    <section className="flex mt-10 justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl gradient-border rounded-lg p-4 sm:p-12 glow-border">
        <div className="space-y-4 text-sm sm:text-base">
          <p className="text-muted-foreground">
            $ system_archivist --initialize --operator=Rasel Ahmed
          </p>
          <div className="h-px gradient-divider my-6"></div>

          <div className="space-y-3">
            <p>
              <span className="text-blue-400">[ROLE]</span>{" "}
              <span className="text-white font-medium">
                Full-Stack Developer & API Architect
              </span>
            </p>
            <p>
              <span className="text-green-400">[STATUS]</span>{" "}
              <span className="text-green-300">All Systems Operational</span>
            </p>
            <p>
              <span className="text-purple-400">[FOCUS]</span>{" "}
              <span className="text-foreground">
                Scalable Web Platforms · Clean Architecture · DX
              </span>
            </p>
            <p>
              <span className="text-cyan-400">[PROJECTS]</span>{" "}
              <span className="text-foreground">
                FinanceOS · DevPortal · CloudSync
              </span>
            </p>
            <p>
              <span className="text-yellow-400">[STACK]</span>{" "}
              <span className="text-foreground">
                TypeScript · Node.js · PostgreSQL · MongoDB · React · Next.js
              </span>
            </p>
            <p>
              <span className="text-orange-400">[MISSION]</span>{" "}
              <span className="text-foreground cursor">
                Build meaningful systems that scale
              </span>
            </p>
          </div>

          <div className="h-px gradient-divider my-6"></div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              href="#contact"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-all duration-200 text-sm font-medium glow-border"
            >
              Initialize Contact
            </Link>
            <Link
              href="/resume"
              className="px-6 py-3 border border-border hover:border-muted-foreground text-foreground rounded transition-all duration-200 text-sm font-medium"
            >
              View Resume
            </Link>
            <Link
              href="#projects"
              className="px-6 py-3 border border-border hover:border-muted-foreground text-foreground rounded transition-all duration-200 text-sm font-medium"
            >
              Access Full Archive
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
