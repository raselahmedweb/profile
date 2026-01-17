import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="gradient-border rounded-lg p-12 glow-border text-center max-w-lg">
        <h1 className="text-6xl font-bold text-white mb-4 glow-text">404</h1>
        <p className="text-muted-foreground mb-2">$ cat error.log</p>
        <p className="text-foreground mb-8">Error: Resource not found in filesystem</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-all duration-200 text-sm font-medium glow-border"
        >
          $ cd ~
        </Link>
      </div>
    </main>
  )
}
