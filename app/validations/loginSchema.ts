import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Za-z0-9]+/, { message: "Password must contain at least one letter and one number" }),
});