export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-sm">
        <p className="opacity-70">© {new Date().getFullYear()} The Alchemyst Eye</p>
        <div className="flex items-center gap-4 opacity-80">
          <a className="hover:opacity-100" href="#privacy">Privacy</a>
          <a className="hover:opacity-100" href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}
