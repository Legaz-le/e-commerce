import { auth } from "@clerk/nextjs/server";

export default async function CheckoutPage() {
  const { userId: clerkId } = await auth();
  
}
