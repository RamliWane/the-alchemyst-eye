export default function Navbar() {
  return (
    <header className="w-full border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <a href="/" className="text-sm font-semibold tracking-tight">The Alchemyst Eye</a>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a className="opacity-80 hover:opacity-100" href="#features">Features</a>
          <a className="opacity-80 hover:opacity-100" href="#testimonials">Testimonials</a>
          <a className="opacity-80 hover:opacity-100" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
