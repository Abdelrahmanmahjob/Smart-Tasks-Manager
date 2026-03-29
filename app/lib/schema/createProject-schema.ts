import { z } from "zod"

export const CreateProjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Project name must be at least 3 characters long" }),
  color: z.string().min(1, { message: "Please select a color" }),
})

export type CreateProjectsInput = z.infer<typeof CreateProjectSchema>
