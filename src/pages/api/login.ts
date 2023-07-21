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

      if (!email) {
        return res.status(400).json({ error: "Email is required." });
      }

      if (!password) {
        return res.status(400).json({ error: "Password is required." });
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !user.password) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
      });

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
