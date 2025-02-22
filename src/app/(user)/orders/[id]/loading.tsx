import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-48" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}