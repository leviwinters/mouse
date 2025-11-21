import type { NextApiRequest, NextApiResponse } from "next";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import pool from "@/lib/db";

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: "email", Value: email },
        ...(name ? [{ Name: "name", Value: name }] : []),
      ],
    });

    const cognitoResponse = await client.send(command);

    // Sync user to database (non-blocking - Cognito signup succeeds even if this fails)
    try {
      await pool.query(
        'INSERT INTO "User" (id, name, email) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING',
        [cognitoResponse.UserSub, name, email]
      );
    } catch (error) {
      console.error("User sync failed", error);
    }

    return res.status(201).json({
      message: "User created",
      userId: cognitoResponse.UserSub,
    });
  } catch (error) {
    console.error("Signup failed", error);
    return res.status(500).json({ error: "Unable to create user" });
  }
}
