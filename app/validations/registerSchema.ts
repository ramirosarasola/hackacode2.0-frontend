import { z } from "zod";

const positions = ["admin", "employee"] as const;

export type Positions = (typeof positions)[number];

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Must be at least 6 characters" }),

  name: z.string().min(3, { message: "Must be at least 3 characters" }),
  lastname: z.string().min(3, { message: "Must be at least 3 characters" }),
  dni: z.string().min(6, { message: "Must be at least 6 characters" }),
  phone: z.string().min(6, { message: "Must be at least 6 characters" }),
  address: z.string().min(3, { message: "Must be at least 3 characters" }),
  country: z.string().min(4, { message: "Must be at least 4 characters" }),

  position: z.enum(positions, { errorMap: () => ({ message: "Invalid Position" }) }),
  salary: z.string().refine((salary) => !isNaN(parseFloat(salary))),

  birthdate: z.string().refine(
    (birthdate) => new Date(birthdate).toString() !== "Invalid Date",
    { message: "Please provide a valid date" }
  ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password must match",
  path: ["confirmPassword"],
});

