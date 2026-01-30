import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

function CartItemSkeleton() {
  return (
    <div className="flex gap-4 items-center animate-pulse">
      <div className="aspect-video shrink-0 w-24 h-14 bg-gray-200 rounded" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
      <div className="text-right space-y-2">
        <div className="h-4 w-16 bg-gray-200 rounded ml-auto" />
        <div className="h-3 w-20 bg-gray-200 rounded ml-auto" />
      </div>
    </div>
  );
}

export default function CheckoutLoading() {
  return (
    <div className="my-15 animate-fade-in">
      <div className="max-w-5xl w-full mx-auto space-y-8">
        <div className="space-y-4">
          <div className="h-6 w-36 bg-gray-200 rounded animate-pulse" />

          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />

          <div className="border-t pt-4 flex justify-between animate-pulse">
            <div className="h-5 w-12 bg-gray-200 rounded" />
            <div className="h-5 w-20 bg-gray-200 rounded" />
          </div>
        </div>

        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 w-36 bg-gray-200 rounded" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-12 w-full bg-gray-200 rounded" />
            <div className="h-12 w-full bg-gray-200 rounded" />
            <div className="flex gap-4">
              <div className="h-12 w-1/2 bg-gray-200 rounded" />
              <div className="h-12 w-1/2 bg-gray-200 rounded" />
            </div>

            <div className="mt-4">
              <div className="h-12 w-full bg-gray-200 rounded" />
            </div>
          </CardContent>
          <CardFooter>
            <div className="h-11 w-full bg-gray-200 rounded" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
