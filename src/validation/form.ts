import { z } from "zod";

const validateForm = z.object({
  email: z
    .string()
    .min(3, "Email must be at least 3 characters long")
    .max(200, "Email must be at most 200 characters long")
    .email("Invalid email address"),
  title: z
    .string()
    .min(5, "Email must be at least 5 characters long")
    .max(200, "Email must be at most 200 characters long"),
});

export default validateForm;
