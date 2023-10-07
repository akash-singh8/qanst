import { z } from "zod";

const answerSchema = z.object({
  answer: z
    .string()
    .min(2, "Answer must be at least 2 characters long")
    .max(500, "Answer must be at most 500 characters long"),
  questionId: z.string().uuid("Invalid UUID format"),
  userId: z
    .string()
    .min(3, "user id must be at least 3 characters long")
    .max(200, "user id must be at most 200 characters long")
    .email("Invalid user email/id"),
});

export default answerSchema;
