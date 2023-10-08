import questionSchema from "@/validation/question";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./qna";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const validateQue = questionSchema.safeParse(req.body);

    if (!validateQue.success) {
      return res.status(400).json({
        message: validateQue.error.issues[0].message,
        err: validateQue.error,
      });
    }

    try {
      const newQue = await prisma.question.create({
        data: {
          content: validateQue.data.question,
          formId: validateQue.data.formId,
          userId: validateQue.data.userId,
        },
      });

      console.log("New question added :", newQue);
      return res.status(201).json({ message: "Question added" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Server Side error while adding question" });
    }
  }

  res.status(404).json({ message: `Method ${req.method} not allowed` });
};

export default handler;
