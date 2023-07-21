import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password }: { email: string; password: string } = req.body;

      // Checking if data was provided
      if (!email) {
        return res.status(400).json({ error: "Email is required." });
      }

      if (!password) {
        return res.status(400).json({ error: "Password is required." });
      }

      // Fetch user from the database by email
      const user = await prisma.user.findUnique({ where: { email } });

      // Check if user exists and verify the password
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Create a JWT token with an expiration of 1 day (24 hours)
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // Return the token and user information
      return res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  } else {
    // If not a POST request
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
