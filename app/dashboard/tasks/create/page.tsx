import Link from "next/link"
import { fetchUserProjects } from "@/app/lib/data"
import CreateTaskForm from "@/app/ui/tasks/CreateTaskForm"

export default async function CreateTaskPage() {
  const projects = await fetchUserProjects()

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/tasks"
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors mb-4 inline-flex items-center gap-2"
          >
            ← Back to Tasks
          </Link>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Create New Task
          </h1>
          <p className="mt-2 text-slate-400">
            Add a new task to keep your work organized
          </p>
        </div>

        {/* Form Component */}
        <CreateTaskForm projects={projects} />

        {/* Help Text */}
        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-sm text-slate-400">
            <span className="font-semibold text-slate-300">💡 Tip:</span> You
            can edit or delete tasks later from the task list.
          </p>
        </div>
      </div>
    </div>
  )
}
