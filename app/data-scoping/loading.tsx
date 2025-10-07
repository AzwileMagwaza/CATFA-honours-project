export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8 animate-pulse">
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded w-1/3" />
          <div className="h-6 bg-muted rounded w-2/3" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-muted rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
