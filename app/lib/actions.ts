"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { registerSchema } from "./register-schema"
import { sql } from "@vercel/postgres"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"

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

export type RegisterState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    general?: string
  }
  message?: string | null
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
