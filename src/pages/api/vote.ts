import { NextApiRequest, NextApiResponse } from "next";
import voteSchema from "@/validation/vote";
import { prisma } from "./qna";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const validateVote = voteSchema.safeParse(req.body);

    if (!validateVote.success) {
      return res.status(400).json({
        message: validateVote.error.issues[0].message,
        err: validateVote.error,
      });
    }

    try {
      const vote = await prisma.vote.create({
        data: validateVote.data,
      });

      console.log("Question voted :", vote);
      return res.status(201).json({ message: "Voted" });
    } catch (err) {
      console.log(err);
      return res.status(409).json({ message: "Question already voted!" });
    }
  }

  res.status(404).json({ message: `Method ${req.method} not allowed` });
};

export default handler;
