const techCategories = [
  {
    name: "Frontend",
    color: "blue",
    techs: ["TypeScript", "React", "React Native", "Next.js", "Tailwind CSS"],
  },
  {
    name: "Backend",
    color: "green",
    techs: ["Node.js", "Express", "Django", "REST APIs"],
  },
  {
    name: "Database",
    color: "purple",
    techs: ["PostgreSQL", "MongoDB", "MySQL", "Prisma"],
  },
  {
    name: "DevOps & Infrastructure",
    color: "orange",
    techs: ["Docker", "AWS", "Azure", "Vercel", "GitHub Actions"],
  },
];

const colorClasses: Record<
  string,
  { bg: string; border: string; text: string; hover: string; label: string }
> = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-300",
    hover: "hover:bg-blue-500/20",
    label: "text-blue-400",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    text: "text-green-300",
    hover: "hover:bg-green-500/20",
    label: "text-green-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-300",
    hover: "hover:bg-purple-500/20",
    label: "text-purple-400",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-300",
    hover: "hover:bg-orange-500/20",
    label: "text-orange-400",
  },
};

export function TechStack() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glow-text">
        $ cat tech_stack.json
      </h2>
      <p className="text-muted-foreground mb-12 text-sm">
        Production-grade tooling
      </p>

      <div className="space-y-8">
        {techCategories.map((category) => {
          const colors = colorClasses[category.color];
          return (
            <div key={category.name}>
              <h3
                className={`${colors.label} font-semibold mb-4 text-sm uppercase tracking-wider`}
              >
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.techs.map((tech) => (
                  <span
                    key={tech}
                    className={`px-4 py-2 ${colors.bg} border ${colors.border} ${colors.text} rounded-full text-sm ${colors.hover} transition-colors`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
