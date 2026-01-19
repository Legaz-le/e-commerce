import { auth } from "@clerk/nextjs/server";
import { GuestCart } from "./GuestCart";
import { ProductCardBasket } from "./ProductCardBasket";
import prisma from "@/lib/prisma";
import { CheckoutButton } from "./CheckoutButton";
import { formatCurrency } from "@/lib/formater";

async function getCartWithUser(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      cart: {
        include: {
          items: {
            where: {
              product: {
                isAvailableForPurchase: true,
              },
            },
            include: {
              product: true,
            },
            orderBy: {
              product: {
                name: "asc",
              },
            },
          },
        },
      },
    },
  });

  return user;
}

export async function Cart() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return <GuestCart />;
  }

  const user = await getCartWithUser(clerkId);

  if (!user) {
    return <GuestCart />;
  }

  const cartItems = user.cart?.items ?? [];

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.product.priceInCents * item.quantity;
  }, 0);

  return (
    <>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex flex-col w-full space-y-5">
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 w-full font-semibold">
            <h1>Product</h1>
            <h2 className="text-center">Quantity</h2>
            <h3 className="text-right">Total</h3>
          </div>
          <div className="hidden md:flex border-b border-solid" />
          <div className="space-y-4">
            {cartItems.map((item) => (
              <ProductCardBasket
                key={item.id}
                cartItemId={item.id}
                {...item.product}
                quantity={item.quantity}
              />
            ))}
          </div>
          <div className="hidden md:flex border-b border-solid" />
          <div className="self-end text-end space-y-3 mt-4">
            <div className="flex justify-end space-x-3">
              <span className="text-lg">Subtotal</span>
              <span className="text-lg font-semibold">
                {formatCurrency(subtotal / 100)}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Taxes and shipping are calculated at checkout
            </p>
            <CheckoutButton />
          </div>
        </div>
      )}
    </>
  );
}

// async function ProductsSuspense() {
//   const cartItem = await getCart();
//   return cartItem.map((carItem) => (
//     <ProductCardBasket key={carItem.id} {...carItem} />
//   ));
// }
