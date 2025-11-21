import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM "Product" ORDER BY id ASC'
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Product list fetch failed", error);
    return res.status(500).json({ error: "Unable to fetch products" });
  }
}
