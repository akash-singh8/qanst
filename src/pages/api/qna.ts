import { NextApiRequest, NextApiResponse } from "next/types";
import validateUUID from "@/validation/uuid";
import validateForm from "@/validation/form";
import { prisma } from "./user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Vulnerable
    const isValidForm = validateForm.safeParse(req.body);

    if (!isValidForm.success) {
      return res.status(400).json({ message: "Invalid request" });
    }

    try {
      const newForm = await prisma.form.create({
        data: {
          hostId: isValidForm.data.email,
          title: isValidForm.data.title,
        },
      });

      res.status(201).json({ formId: newForm.fid });
    } catch (err) {
      console.log(err);
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
          questions: {
            include: {
              user: true,
              votes: true,
              answers: {
                include: {
                  user: true,
                },
              },
            },
          },
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
