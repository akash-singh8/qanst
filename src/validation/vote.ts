import { z } from "zod";

const voteSchema = z.object({
  questionId: z.string().uuid("Invalid UUID format"),
  userId: z
    .string()
    .min(3, "user id must be at least 3 characters long")
    .max(200, "user id must be at most 200 characters long")
    .email("Invalid user email/id"),
});

export default voteSchema;
