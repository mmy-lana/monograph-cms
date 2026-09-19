export default function ArticleSkeleton() {
  return (
    <div className="max-w-[42.5rem] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-24 animate-pulse">
      <div className="h-10 bg-neutral-200 rounded-sm mb-4 w-3/4" />
      <div className="h-5 bg-neutral-200 rounded-sm mb-6 w-1/2" />
      <div className="flex items-center gap-3 py-4 border-y border-neutral-200 mb-10">
        <div className="w-12 h-12 bg-neutral-200 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-neutral-200 rounded-sm w-1/4" />
          <div className="h-3 bg-neutral-200 rounded-sm w-1/6" />
        </div>
      </div>
      <div className="aspect-16/9 bg-neutral-200 rounded-xs mb-8" />
      <div className="space-y-4">
        <div className="h-4 bg-neutral-200 rounded-sm w-full" />
        <div className="h-4 bg-neutral-200 rounded-sm w-full" />
        <div className="h-4 bg-neutral-200 rounded-sm w-4/5" />
      </div>
    </div>
  );
}
