import { fetchTaskById } from "@/app/lib/data"
import { fetchUserProjects } from "@/app/lib/data"
import EditTaskForm from "@/app/ui/tasks/EditTaskForm"

export default async function EditTaskPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  const [task, projects] = await Promise.all([
    fetchTaskById(id),
    fetchUserProjects(),
  ])

  console.log(task)
  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Task Not Found</h1>
          <p className="text-slate-400">
            The task you're looking for doesn't exist.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Edit Task</h1>
        <p className="text-slate-400 mt-2">Update your task details below</p>
      </div>
      <EditTaskForm task={task} projects={projects} />
    </div>
  )
}
