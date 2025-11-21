import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userId = req.query.userId as string;
  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }

  try {
    const result = await pool.query(
      'SELECT id, created_at, total, items FROM "Order" WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return res.status(200).json({ orders: result.rows });
  } catch (error) {
    console.error("Order fetch failed", error);
    return res.status(500).json({ error: "Unable to fetch orders" });
  }
}
