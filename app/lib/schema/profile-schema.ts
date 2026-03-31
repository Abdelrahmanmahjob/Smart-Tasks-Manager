import { z } from "zod"

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  avatar: z
    .any()
    .refine(
      // لو في ملف وحجمه أكبر من 0، شيك على الحجم
      (file) => !file || file.size === 0 || file.size <= MAX_FILE_SIZE,
      "Max size is 2MB.",
    )
    .refine(
      // لو في ملف وحجمه أكبر من 0، شيك على النوع
      (file) =>
        !file || file.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png and .webp formats are supported.",
    )
    .optional(),
})
export type ProfileData = z.infer<typeof profileSchema>
