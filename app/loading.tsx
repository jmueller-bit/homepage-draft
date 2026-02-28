export default function Loading() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Animated Logo Placeholder */}
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <div className="absolute inset-2 bg-primary/40 rounded-full animate-pulse" />
            <div className="absolute inset-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
        
        <h2 className="font-sans text-xl font-bold text-charcoal mb-2">
          Wird geladen...
        </h2>
        <p className="font-serif text-charcoal/60">
          Bitte einen Moment Geduld
        </p>
        
        {/* Progress Bar */}
        <div className="mt-6 w-48 h-1 bg-charcoal/10 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-primary animate-loading-bar rounded-full" />
        </div>
      </div>
    </div>
  )
}
