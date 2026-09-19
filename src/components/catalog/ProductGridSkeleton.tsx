import { Skeleton } from "@/components/ui/skeleton";

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-busy aria-label="Carregando o arsenal">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-lg border border-line bg-asphalt-800 p-4" style={{ animationDelay: `${i * 60}ms` }}>
          <Skeleton className="aspect-[4/3] w-full" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="h-11 w-full" />
        </div>
      ))}
    </div>
  );
}
