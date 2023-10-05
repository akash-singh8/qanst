import { z } from "zod";

const validateUUID = z.object({
  fid: z.string().uuid("Invalid UUID format"),
});

export default validateUUID;
