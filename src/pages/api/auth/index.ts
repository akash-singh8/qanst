import { NextApiRequest, NextApiResponse } from "next/types";
import userSchema from "@/validation/user";
import authenticate from "@/middleware/authenticate";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = await authenticate(req, res);

    const isValidData = userSchema.safeParse({
      name: user?.name,
      email: user?.email,
      pictureUrl: user?.image,
    });

    if (!isValidData.success) {
      return res.status(400).json({
        message: isValidData.error.issues[0].message,
        err: isValidData.error,
      });
    }

    try {
      const newUser = await prisma.user.create({ data: isValidData.data });

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
