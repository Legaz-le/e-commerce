import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET to .env");
  }

  const info = await headers();
  const svix_id = info.get("svix-id");
  const svix_timestamp = info.get("svix-timestamp");
  const svix_signature = info.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error("Headers are missing");
  }

  const body = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.log("Error verifying webhook", err);
    return new NextResponse("Error verifying webhook", { status: 400 });
  }
  const eventType = evt.type;
  if (eventType === "user.created") {
    const { email_addresses, id } = evt.data;
    const email = email_addresses[0]?.email_address || "";
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        // User exists (probably from guest checkout)
        if (!existingUser.clerkId) {
          // Link the guest user to Clerk
          await prisma.user.update({
            where: { email },
            data: { clerkId: id },
          });
        }
        // If clerkId already exists, do nothing (already linked)
      } else {
        // Create new user
        await prisma.user.create({
          data: { clerkId: id, email },
        });
      }
    } catch (err) {
      console.log("Error creating user:", err);
      return new NextResponse("Error creating user", { status: 500 });
    }
  }
  if (eventType === "user.deleted") {
    const { id } = evt.data;
    try {
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: id },
      });

      if (existingUser) {
        await prisma.user.delete({
          where: { clerkId: id },
        });
      }
      // If user doesn't exist, do nothing
    } catch (err) {
      console.log("Error deleting user:", err);
      return new NextResponse("Error deleting user", { status: 500 });
    }
  }
  return new NextResponse("Webhook processed successfully", { status: 200 });
}
