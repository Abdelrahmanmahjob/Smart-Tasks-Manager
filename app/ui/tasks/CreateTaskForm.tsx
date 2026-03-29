"use client"

import Link from "next/link"
import Button from "@/app/ui/Button"
import { Card } from "@/app/ui/Card"
import { useActionState } from "react"
import { createTask } from "@/app/lib/actions"
import { showToast } from "nextjs-toast-notify"
import { useEffect } from "react"
import { redirect } from "next/navigation"

export default function CreateTaskForm({ projects }: any) {
  const initialState = { message: null, errors: {} }
  const [state, formAction, isPending] = useActionState(
    createTask,
    initialState,
  )

  useEffect(() => {
    if (state?.success) {
      showToast.success("Task created successfully!", {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        icon: "",
        sound: true,
      })
      redirect("/dashboard/tasks")
    } else if (state?.message) {
      showToast.error(state.message, {
        duration: 4000,
        progress: true,
        transition: "swingInverted",
        sound: true,
      })
    }
  }, [state])
  return (
    <Card className="overflow-hidden">
      <form action={formAction} className="divide-y divide-slate-700">
        {/* Title Field */}
        <div className="p-6 border-b border-slate-700">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-white mb-2"
          >
            Task Title
            <span className="text-red-400 ml-1">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          {state?.errors?.title && (
            <p className="mt-1 text-sm text-red-400">{state.errors.title[0]}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="p-6 border-b border-slate-700">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-white mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Add task details (optional)"
            rows={4}
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Priority and Status Row */}
        <div className="p-6 border-b border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-semibold text-white mb-2"
            >
              Priority
              <span className="text-red-400 ml-1">*</span>
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue="medium"
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-white mb-2"
            >
              Status
              <span className="text-red-400 ml-1">*</span>
            </label>
            <select
              id="status"
              name="status"
              defaultValue="pending"
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Due Date and Project Row */}
        <div className="p-6 border-b border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Due Date */}
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-semibold text-white mb-2"
            >
              Due Date
              <span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="date"
              id="dueDate"
              name="due_date"
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {state?.errors?.due_date && (
              <p className="mt-1 text-sm text-red-400">
                {state.errors.due_date[0]}
              </p>
            )}
          </div>

          {/* Project */}
          <div>
            <label
              htmlFor="projectId"
              className="block text-sm font-semibold text-white mb-2"
            >
              Project
            </label>
            <select
              id="projectId"
              name="project_id"
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="">Select a project (optional)</option>
              {projects.map((project: any) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex gap-3 sm:justify-end">
          <Link href="/dashboard/tasks" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </div>
        {state?.message && (
          <div className="p-4 bg-red-600/50 border border-red-500 text-red-200 rounded-lg m-6">
            {state.message}
          </div>
        )}
      </form>
    </Card>
  )
}
