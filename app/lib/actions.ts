"use server"

import { signIn, signOut, auth } from "@/auth"
import { AuthError } from "next-auth"
import { registerSchema } from "./schema/register-schema"
import { sql } from "@vercel/postgres"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createTaskSchema } from "./schema/createTask-schema"
import {
  CreateTaskState,
  ProfileState,
  ProjectState,
  RegisterState,
} from "./definitions"
import { CreateProjectSchema } from "./schema/createProject-schema"
import { profileSchema } from "./schema/profile-schema"
import { put } from "@vercel/blob"

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: "/dashboard",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    throw error
  }
}

export async function register(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  let isSuccess = false

  try {
    const data = Object.fromEntries(formData)
    const parsedData = registerSchema.safeParse(data)
    if (!parsedData.success) {
      return {
        message: "Validation failed",
        errors: parsedData.error.flatten().fieldErrors,
      }
    }

    const { name, email, password } = parsedData.data
    const hashedPassword = await bcrypt.hash(password, 10)
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `
    await signIn("credentials", {
      email,
      password,
    })

    isSuccess = true
  } catch (error: any) {
    if (error.code === "23505") {
      return { message: "This email is already registered." }
    }
    return {
      message: "Registration failed",
      errors: {
        general: error instanceof Error ? error.message : String(error),
      },
    }
  }

  if (isSuccess) redirect("/dashboard")

  return { message: null }
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/login" })
}

export async function createTask(
  prevState: CreateTaskState,
  formData: FormData,
): Promise<CreateTaskState> {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return { message: "You must be logged in to create a task." }

  const data = Object.fromEntries(formData)
  const validatedFields = createTaskSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Task.",
    }
  }

  const { title, description, status, priority, due_date, project_id } =
    validatedFields.data

  const dbProjectId = project_id === "" ? null : project_id

  try {
    await sql`
      INSERT INTO tasks (title, description, status, priority, due_date, project_id, user_id)
      VALUES (${title}, ${description}, ${status}, ${priority}, ${due_date}, ${dbProjectId}, ${userId});
    `
    revalidatePath("/dashboard/tasks")
    return { success: true }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to create task.")
  }
}

export async function updateTask(
  id: string,
  prevState: CreateTaskState,
  formData: FormData,
): Promise<CreateTaskState> {
  const data = Object.fromEntries(formData)
  const validatedFields = createTaskSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Task.",
    }
  }

  const { title, description, status, priority, due_date, project_id } =
    validatedFields.data
  const dbProjectId = project_id === "" ? null : project_id

  try {
    await sql`
    UPDATE tasks
    SET 
      title = ${title},
      description = ${description},
      status = ${status},
      priority = ${priority},
      due_date = ${due_date},
      project_id = ${dbProjectId}
    WHERE id = ${id}
  `
    revalidatePath("/dashboard/tasks")
    return { success: true }
  } catch (error) {
    console.error("Database Error: ", error)
    throw new Error("Failed to update task.")
  }
}

export async function deleteTask(id: string) {
  try {
    await sql`DELETE FROM tasks WHERE id = ${id}`
    revalidatePath("/dashboard/tasks")
    return { success: true, message: "Task deleted successfully." }
  } catch (error) {
    console.error("Database Error: ", error)
    throw new Error("Failed to delete task.")
  }
}

export async function createProject(
  prevState: ProjectState,
  formData: FormData,
): Promise<ProjectState> {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error("Unauthorized")

  const validatedFields = CreateProjectSchema.safeParse({
    name: formData.get("name"),
    color: formData.get("color"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Project.",
    }
  }

  const { name, color } = validatedFields.data

  try {
    await sql`
      INSERT INTO projects (name, color, user_id)
      VALUES (${name}, ${color}, ${userId})
    `
  } catch (error) {
    return { message: "Database Error: Failed to Create Project." }
  }

  revalidatePath("/dashboard/projects")
  redirect("/dashboard/projects")
}

export async function updateProject(
  id: string,
  prevState: ProjectState,
  formData: FormData,
): Promise<ProjectState> {
  const data = Object.fromEntries(formData)
  const validatedFieleds = CreateProjectSchema.safeParse(data)

  if (!validatedFieleds.success) {
    return {
      errors: validatedFieleds.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Project.",
    }
  }
  const { name, color } = validatedFieleds.data

  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error("Unauthorized")

  try {
    await sql`
      UPDATE projects
      SET name = ${name}, color = ${color}
      WHERE id = ${id} AND user_id = ${userId}
    `
  } catch (error) {
    return { message: "Database Error: Failed to Update Project." }
  }
  revalidatePath("/dashboard/projects")
  revalidatePath(`/dashboard/projects/${id}/detail`)

  redirect(`/dashboard/projects/${id}/detail`)
}

export async function deleteProject(id: string) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error("Unauthorized")
  try {
    await sql`DELETE FROM projects WHERE id = ${id} AND user_id = ${userId}`

    revalidatePath("/dashboard/projects")
  } catch (error) {
    return { message: "Database Error: Failed to Delete Project." }
  }

  redirect("/dashboard/projects")
}

export async function updateProfile(
  prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) throw new Error("Unauthorized")

  const data = Object.fromEntries(formData)
  const validatedFields = profileSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Profile.",
    }
  }

  const name = validatedFields.data.name ?? null
  const file = formData.get("avatar") as File
  let uploadedUrl = null

  if (file && file.size > 0) {
    const blob = await put(file.name, file, {
      access: "public",
    })
    uploadedUrl = blob.url
  }

  try {
    await sql`
    UPDATE users
    SET 
      name = COALESCE(${name}, name),
      avatar_url = COALESCE(${uploadedUrl}, avatar_url)
    WHERE id = ${userId}
  `

    revalidatePath("/dashboard/settings/profile")
    return { message: "Profile updated successfully." }
  } catch (error) {
    console.error(error)
    return { message: "Database Error: Failed to Update Profile." }
  }
}
