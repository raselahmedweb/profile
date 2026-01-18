import { CONTACT_INFO } from "@/lib/db";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
        <p>
          © {currentYear} Rasel · System Architect ·{" "}
          <a
            href={`https://${CONTACT_INFO.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            {CONTACT_INFO.website}
          </a>
        </p>
      </div>
    </footer>
  );
}
