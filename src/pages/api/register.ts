import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prismaClient";

export type UserInterface = {
  password: string;
  name: string;
  surname: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { password, name, email, surname }: UserInterface = req.body;

      // Checking if data was provided
      if (!password) {
        return res.status(400).json({ error: "Password is required." });
      }

      if (!name) {
        return res.status(400).json({ error: "Name is required." });
      }

      if (!email) {
        return res.status(400).json({ error: "Email is required." });
      }

      if (!surname) {
        return res.status(400).json({ error: "Surname is required." });
      }

      // Encrypting password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save user in the database
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      // Return encrypted password
      return res.status(200).json({
        id: user.id,
        name,
        email,
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
