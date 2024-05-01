import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
  } else {
    const { email, username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }
    const existingUser = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      res.status(400).json({ message: "Email already taken" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await client.user.create({
        data: {
          email,
          name:username,
          hashedPassword,
          image: "",
          emailVerified: new Date(),
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).end();
    }
  }
}
