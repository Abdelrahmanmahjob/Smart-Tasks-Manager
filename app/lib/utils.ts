import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const generatePagination = (currentPage: number, totalPages: number) => {
  // 1. لو عدد الصفحات 7 أو أقل، اعرضهم كلهم بدون نقاط
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // 2. لو المستخدم في البداية (أول 3 صفحات)
  // اعرض: 1, 2, 3, ..., آخر صفحتين
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }

  // 3. لو المستخدم في النهاية (آخر 3 صفحات)
  // اعرض: أول صفحتين, ..., آخر 3 صفحات
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  // 4. لو المستخدم في "نص" الصفحات
  // اعرض: أول صفحة, ..., الصفحة القبل الحالية، الحالية، البعد الحالية, ..., آخر صفحة
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
