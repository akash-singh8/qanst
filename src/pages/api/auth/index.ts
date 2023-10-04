import { NextApiRequest, NextApiResponse } from "next/types";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user: { email: string; name: string; pictureUrl: string } =
      req.body.user;

    try {
      const newUser = await prisma.user.create({ data: user });

      console.log("New user added :", newUser);
      return res.status(201).json({ message: "User added" });
    } catch (err) {
      console.log(err);
      return res.status(409).json({ message: "User already stored" });
    }
  }

  res.status(404).json({ message: `Method ${req.method} not allowed` });
};

export default handler;
