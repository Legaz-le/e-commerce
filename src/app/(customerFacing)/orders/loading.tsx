import { Card } from "@/components/ui/card";

function OrderCardSkeleton() {
  return (
    <Card className="mb-4 p-6 animate-pulse">
      <div className="flex justify-between items-center mb-4 border-b pb-4">
        <div className="h-5 w-32 bg-gray-200 rounded" />
        <div className="flex items-center gap-4">
          <div className="h-6 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      {[1, 2].map((i) => (
        <div key={i} className="flex items-center gap-4 py-2">
          <div className="w-16 h-16 bg-gray-200 rounded" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      ))}

      <div className="flex justify-end border-t pt-4 mt-4">
        <div className="h-5 w-24 bg-gray-200 rounded" />
      </div>
    </Card>
  );
}

export default function OrdersLoading() {
  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="h-8 w-32 bg-gray-200 rounded mb-6 animate-pulse" />
      <div className="space-y-4">
        <OrderCardSkeleton />
        <OrderCardSkeleton />
        <OrderCardSkeleton />
      </div>
    </div>
  );
}
