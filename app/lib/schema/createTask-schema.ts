import { z } from "zod"

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title is required & must be at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["pending", "in_progress", "completed"]).default("pending"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  due_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  project_id: z.string().optional().nullable(),
})

// 2. استخراج النوع تلقائياً (Zod magic)
export type CreateTasksInput = z.infer<typeof createTaskSchema>
