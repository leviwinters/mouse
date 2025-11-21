import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items, userId } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items array required" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const productIds = items.map(
      (item: { productId: number }) => item.productId
    );

    const result = await pool.query(
      'SELECT id, name, price FROM "Product" WHERE id = ANY($1)',
      [productIds]
    );

    const products = result.rows;

    const lineItems = items.map(
      (item: { productId: number; quantity: number }) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
          console.error("Product not found", { productId: item.productId });
          throw new Error("Product lookup failed");
        }
        return {
          price_data: {
            currency: "usd",
            product_data: { name: product.name },
            unit_amount: Math.round(Number(product.price) * 100),
          },
          quantity: item.quantity,
        };
      }
    );

    const totalAmount = lineItems.reduce(
      (sum, li) => sum + (li.price_data.unit_amount * li.quantity) / 100,
      0
    );

    console.log("Creating checkout session", {
      userId,
      total: totalAmount.toFixed(2),
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
      metadata: {
        user_id: userId,
        items: JSON.stringify(items),
        total: totalAmount.toFixed(2),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Checkout session creation failed", error);
    return res.status(500).json({ error: "Unable to create checkout session" });
  }
}
