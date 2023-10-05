import { NextApiRequest, NextApiResponse } from "next/types";
import authenticate from "@/middleware/authenticate";
import validateUUID from "@/validation/uuid";
import { prisma } from "./auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = await authenticate(req, res);
    const email = user?.email;

    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }

    try {
      const newForm = await prisma.form.create({
        data: {
          hostId: email,
        },
      });

      res.status(201).json({ formId: newForm.fid });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }

    return;
  }

  if (req.method === "GET") {
    const isValidInput = validateUUID.safeParse(req.query);

    if (!isValidInput.success) {
      return res.status(400).json({ message: "Invalid form id" });
    }

    try {
      const form = await prisma.form.findUnique({
        where: {
          fid: isValidInput.data.fid,
        },
        include: {
          host: true,
          questions: true,
        },
      });

      res.status(200).json(form);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }

    return;
  }

  res.status(404).json({ message: `Method ${req.method} not allowed` });
};

export default handler;
