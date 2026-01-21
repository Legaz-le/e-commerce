import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrderForUser } from "@/actions/orders";
import { formatCurrency } from "@/lib/formater";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default async function myOrderPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) return redirect("/sign-in?redirect_url=/orders");

  const { orders, error } = await getOrderForUser();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No orders yet</p>
          <Link href="/products" className="text-primary underline">
            Browse products
          </Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <Card key={order.id} className="mb-4 p-6">
              <div className="flex justify-between items-center mb-4 border-b pb-4">
                <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-muted-foreground">
                  {order.createdAt.toLocaleDateString()}
                </p>
              </div>
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-2">
                  <Image
                    src={item.product.imagePath}
                    alt={item.product.name}
                    width={64}
                    height={64}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty:{item.quantity}
                    </p>
                  </div>

                  <span>{formatCurrency(item.priceInCents / 100)}</span>
                </div>
              ))}

              <div className="flex justify-end border-t pt-4 mt-4 font-semibold">
                Total: {formatCurrency(order.totalPaidInCents / 100)}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
