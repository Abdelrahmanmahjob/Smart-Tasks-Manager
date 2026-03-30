import Link from "next/link"
import { ArrowLeftIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { fetchProjectById, fetchTasksByProjectId } from "@/app/lib/data"
import TasksContainer from "@/app/ui/tasks/TasksContainer"
import EditProjectModal from "@/app/ui/projects/EditProjectModal"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import DeleteProjectModal from "@/app/ui/projects/DeleteProjectModal"

export default async function ProjectDetailsPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams?: { edit?: string; delete?: string }
}) {
  const { id } = await params
  const query = await searchParams
  const isEditing = query?.edit === "true"
  const isDeleting = query?.delete === "true"

  const project = await fetchProjectById(id)
  const tasks = await fetchTasksByProjectId(id)
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/projects"
          className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 text-slate-400 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/60">
          <div className="flex items-center gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Project Workspace
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: project?.color }}
                >
                  Active
                </span>
              </div>

              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {project?.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-5 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-md">
              <p className="text-xs text-slate-500 font-medium mb-0.5">
                Total Tasks
              </p>
              <p className="text-xl font-mono font-bold text-white leading-none">
                {tasks.length.toString().padStart(2, "0")}
              </p>
            </div>
            <Link
              href={`/dashboard/projects/${id}/detail?edit=true`}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </Link>
            <Link
              href={`/dashboard/projects/${id}/detail?delete=true`}
              className="p-3 bg-red-900/20 hover:bg-red-900/40 text-red-500 rounded-xl transition-all border border-red-900/30"
            >
              <TrashIcon className="w-5 h-5" />
            </Link>

            <Link
              href={`/dashboard/tasks/create?project_id=${project?.id}`}
              className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg"
            >
              <PlusIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 min-h-100">
        <TasksContainer tasks={tasks} />
      </div>
      {isEditing && <EditProjectModal project={project} />}
      {isDeleting && <DeleteProjectModal id={id} name={project?.name} />}
    </main>
  )
}
