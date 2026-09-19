import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2">404 Error</p>
      <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">Page not found</h1>
      <p className="font-serif text-neutral-600 text-lg mb-8">
        The monograph you are looking for has been moved, archived, or does not exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-black transition-colors"
      >
        Return to publication
      </Link>
    </div>
  );
}
