import { UpdateEmailInput } from "./schema/updateEmail-schema"
import { CreateProjectsInput } from "./schema/createProject-schema"
import { CreateTasksInput } from "./schema/createTask-schema"
import { ProfileData } from "./schema/profile-schema"
import { UpdatePasswordInput } from "./schema/updatePassword-schema"

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

// تعريف شكل حالة الرد (State) ليعرف المتصفح ما الذي سيستقبله
export type CreateTaskState = {
  success?: boolean
  errors?: {
    [K in keyof CreateTasksInput]?: string[]
  }
  message?: string | null
}

export interface Project {
  id: string
  name: string
  color: string
  tasks_count: string | number
}

export type ProjectState = {
  errors?: {
    [K in keyof CreateProjectsInput]?: string[]
  }
  message?: string | null
}

export type ProfileState = {
  success?: boolean
  errors?: {
    [K in keyof ProfileData]?: string[]
  }
  message?: string | null
}

export type UpdateEmailState = {
  success?: boolean
  errors?: {
    [K in keyof UpdateEmailInput]?: string[]
  }
  message?: string | null
}

export type UpdatePasswordState = {
  success?: boolean
  errors?: {
    [K in keyof UpdatePasswordInput]?: string[]
  }
  message?: string | null
}
