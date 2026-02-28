export default function Loading() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        {/* Skeleton for News Item */}
        <div className="w-full max-w-2xl space-y-4">
          <div className="h-8 bg-charcoal/10 rounded-lg animate-pulse w-3/4 mx-auto" />
          <div className="h-4 bg-charcoal/10 rounded-lg animate-pulse w-1/2 mx-auto" />
          <div className="h-64 bg-charcoal/10 rounded-xl animate-pulse mt-6" />
          <div className="space-y-2 mt-6">
            <div className="h-4 bg-charcoal/10 rounded animate-pulse" />
            <div className="h-4 bg-charcoal/10 rounded animate-pulse" />
            <div className="h-4 bg-charcoal/10 rounded animate-pulse w-5/6" />
          </div>
        </div>
      </div>
    </div>
  )
}
