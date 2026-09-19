export function Footer() {
  return (
    <footer className="border-t border-editorial-border py-12 mt-20 text-center text-xs text-neutral-500 font-sans">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 Monograph Publishing Platform. Built with Next.js 15 & Sanity.</p>
        <div className="flex gap-6">
          <span className="hover:underline cursor-pointer">Help</span>
          <span className="hover:underline cursor-pointer">Status</span>
          <span className="hover:underline cursor-pointer">Writers</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
        </div>
      </div>
    </footer>
  );
}
