import { Webhook } from "svix";
import { headers } from 'next/headers'

export async function POST(req: Request) {
  const WEBHOOKS_SECRET = process.env.CLERK_WEBHOOK_SECRET;
}
