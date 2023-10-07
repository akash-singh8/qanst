import { NextApiRequest, NextApiResponse } from "next";
import answerSchema from "@/validation/answer";
import { prisma } from "./user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const validateAns = answerSchema.safeParse(req.body);

    if (!validateAns.success) {
      return res.status(400).json({
        message: validateAns.error.issues[0].message,
        err: validateAns.error,
      });
    }

    try {
      const newAns = await prisma.answer.create({
        data: {
          content: validateAns.data.answer,
          questionId: validateAns.data.questionId,
          userId: validateAns.data.userId,
        },
      });

      console.log("New answer added :", newAns);
      return res.status(201).json({ message: "Answer added" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Server Side error while adding answer" });
    }
  }

  res.status(404).json({ message: `Method ${req.method} not allowed` });
};

export default handler;
