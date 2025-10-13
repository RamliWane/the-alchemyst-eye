export default function Features() {
  return (
    <section id="features" className="w-full py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center">Powerful features</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-black/10 dark:border白/10 p-6">
            <h3 className="font-medium">Fast</h3>
            <p className="mt-2 text-sm opacity-80">Optimized with Next.js 15 and Tailwind v4 for speed.</p>
          </div>
          <div className="rounded-lg border border-black/10 dark:border白/10 p-6">
            <h3 className="font-medium">Modern</h3>
            <p className="mt-2 text-sm opacity-80">Clean UI, responsive by default, accessible structure.</p>
          </div>
          <div className="rounded-lg border border-black/10 dark:border白/10 p-6">
            <h3 className="font-medium">Scalable</h3>
            <p className="mt-2 text-sm opacity-80">Composable components for easy extension.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
