export default function Hero() {
  return (
    <section className="w-full py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">Welcome to The Alchemyst Eye</h1>
        <p className="mt-4 text-base sm:text-lg text-black/70 dark:text-white/70">
          Transforming insights into action with a modern, fast Next.js app.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#get-started" className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90">
            Get Started
          </a>
          <a href="#learn-more" className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/20 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
