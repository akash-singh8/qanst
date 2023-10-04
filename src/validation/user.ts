import { z } from "zod";

const userSchema = z.object({
  email: z
    .string()
    .min(3, "Email must be at least 3 characters long")
    .max(200, "Email must be at most 200 characters long")
    .email("Invalid email address"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(80, "Name must be at most 80 characters long"),
  pictureUrl: z
    .string()
    .min(10, "Picture URL must be at least 10 characters long")
    .max(500, "Picture URL must be at most 500 characters long"),
});

export default userSchema;
