import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import pool from "@/lib/db";
import { stripe } from "@/lib/stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function saveOrder(session: Stripe.Checkout.Session) {
  const metadata = session.metadata;
  if (!metadata) return;

  const userId = metadata.user_id;
  const itemsRaw = metadata.items;
  const totalRaw = metadata.total;

  if (!userId || !itemsRaw || !totalRaw) {
    console.error("Order metadata missing required fields");
    return;
  }

  let items: string;
  try {
    // Validate that itemsRaw is valid JSON, then use it as-is
    JSON.parse(itemsRaw);
    items = itemsRaw;
  } catch {
    console.error("Unable to parse order items from metadata");
    return;
  }

  const total = Number(totalRaw);
  if (isNaN(total)) {
    console.error("Invalid order total in metadata");
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO "Order" (user_id, items, total, stripe_session_id)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (stripe_session_id) DO NOTHING
       RETURNING *`,
      [userId, items, total, session.id]
    );

    console.log("Order saved", {
      orderId: result.rows[0]?.id,
      userId,
      total,
    });
  } catch (error) {
    console.error("Order save failed", error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  let event: Stripe.Event;

  if (!webhookSecret) {
    return res.status(500).json({ error: "Webhook secret not configured" });
  }

  try {
    event = stripe.webhooks.constructEvent(buf, sig as string, webhookSecret);
  } catch {
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  switch (event.type) {
    case "payment_intent.payment_failed": {
      console.log("Payment intent failed");
      break;
    }
    case "payment_intent.succeeded": {
      console.log("Payment intent succeeded");
      break;
    }
    case "checkout.session.completed": {
      console.log("Checkout session completed");
      const session = event.data.object as Stripe.Checkout.Session;
      await saveOrder(session);
      break;
    }
    case "checkout.session.expired": {
      console.log("Checkout session expired");
      break;
    }
    default: {
      console.log("Unhandled event type", { type: event.type });
      break;
    }
  }

  return res.status(200).json({ received: true });
}
