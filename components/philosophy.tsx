export function Philosophy() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glow-text">$ cat philosophy.txt</h2>
      <p className="text-muted-foreground mb-12 text-sm">Core principles</p>

      <div className="space-y-6 text-foreground leading-relaxed">
        <p className="text-lg">
          Software architecture is about making decisions that minimize long-term regret. Every abstraction carries
          cost. Every dependency creates coupling. Every optimization trades clarity for performance.
        </p>
        <p className="text-lg">
          I build systems that solve real problems. Code is a means, not an end. The best solution is often the simplest
          one that meets actual requirements, not theoretical perfection.
        </p>
        <p className="text-lg">
          Developer experience matters. Tools should feel natural. APIs should be intuitive. Error messages should be
          helpful. If the team struggles to use what you built, you built the wrong thing.
        </p>
      </div>
    </section>
  )
}
