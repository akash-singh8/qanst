import { z } from "zod";
import voteSchema from "./vote";

const answerSchema = z.object({
  answer: z
    .string()
    .min(2, "Answer must be at least 2 characters long")
    .max(500, "Answer must be at most 500 characters long"),
  ...voteSchema.shape,
});

export default answerSchema;
