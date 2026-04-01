import { z } from "zod"

export const updateEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export type UpdateEmailInput = z.infer<typeof updateEmailSchema>
