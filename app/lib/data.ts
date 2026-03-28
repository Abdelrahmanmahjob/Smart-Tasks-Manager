import { sql } from "@vercel/postgres"
import { auth } from "@/auth"

const ITEMS_PER_PAGE = 6
export async function fetchUserTasks({
  searchTerm = "",
  currentPage = 1,
}: {
  searchTerm?: string
  currentPage?: number
}) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return []

  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  try {
    const data = await sql`
      SELECT 
        tasks.id,
        tasks.title,
        tasks.status,
        tasks.priority,
        tasks.due_date,
        projects.name AS project_name,
        projects.color AS project_color
      FROM tasks 
      LEFT JOIN projects ON tasks.project_id = projects.id
      WHERE tasks.user_id = ${userId} AND (tasks.title ILIKE ${`%${searchTerm}%`} OR projects.name ILIKE ${`%${searchTerm}%`})
      ORDER BY tasks.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return data.rows
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch tasks.")
  }
}

export async function fetchUserProjects() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return []

  try {
    const data = await sql`
        SELECT id, name, color 
        FROM projects 
        WHERE user_id = ${userId} 
        ORDER BY name ASC;
    `

    return data.rows
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Projects.")
  }
}

export async function fetchTaskById(id: string) {
  try {
    const data = await sql`
      SELECT * FROM tasks WHERE id = ${id};
    `
    return data.rows[0]
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch task.")
  }
}

export async function fetchTasksPagesCount({
  searchTerm = "",
}: {
  searchTerm?: string
}) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return []

  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM tasks 
      LEFT JOIN projects ON tasks.project_id = projects.id
      WHERE tasks.user_id = ${userId} AND (tasks.title ILIKE ${`%${searchTerm}%`} OR projects.name ILIKE ${`%${searchTerm}%`})
    `
    const count = parseInt(data.rows[0].count)
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch tasks pages count.")
  }
}
