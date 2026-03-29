import Link from "next/link"
import DeleteTaskModal from "./DeleteTaskModal"
import Button from "../Button"
import { Card } from "../Card"
import { CreateTasksInput } from "@/app/lib/schema/createTask-schema"

const priorityConfig = {
  high: {
    label: "High",
    color: "bg-red-600",
    lightColor: "bg-red-900/30",
    textColor: "text-red-300",
  },
  medium: {
    label: "Medium",
    color: "bg-yellow-600",
    lightColor: "bg-yellow-900/30",
    textColor: "text-yellow-300",
  },
  low: {
    label: "Low",
    color: "bg-green-600",
    lightColor: "bg-green-900/30",
    textColor: "text-green-300",
  },
}

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-slate-600",
    textColor: "text-slate-300",
    icon: "○",
  },
  in_progress: {
    label: "In Progress",
    color: "bg-indigo-600",
    textColor: "text-indigo-300",
    icon: "⟳",
  },
  completed: {
    label: "Completed",
    color: "bg-green-600",
    textColor: "text-green-300",
    icon: "✓",
  },
}

export default function TasksContainer({ tasks }: { tasks: any }) {
  const getStatusConfig = (status: string) => {
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    )
  }

  const getPriorityConfig = (priority: string) => {
    return (
      priorityConfig[priority as keyof typeof priorityConfig] ||
      priorityConfig.low
    )
  }

  const formatDate = (date: string | null) => {
    if (!date) return "No deadline"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  return (
    <div className="grid gap-4 md:gap-6">
      {tasks.length === 0 && (
        <Card className="col-span-full">
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="text-6xl mb-4 opacity-50">📋</div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              No Tasks Found
            </h3>
            <p className="text-slate-400 text-center mb-6">
              Try creating a new task
            </p>
            <Link href="/dashboard/tasks/create" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="text-xl mr-2">+</span>
                Create New Task
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {tasks.map((task: any) => {
        const taskStatus = getStatusConfig(task.status)
        const taskPriority = getPriorityConfig(task.priority)

        return (
          <Card
            key={task.id}
            className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Task Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-4">
                  {/* Status Indicator */}
                  <div
                    className={`mt-1 shrink-0 w-10 h-10 rounded-full ${taskStatus.color} flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {taskStatus.icon}
                  </div>

                  {/* Task Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate group-hover:text-slate-100 transition-colors">
                      {task.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {/* Project Badge */}
                      {task.project_name && (
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{
                            backgroundColor: task.project_color || "#6366f1",
                          }}
                        >
                          {task.project_name}
                        </span>
                      )}

                      {/* Date */}
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        📅 {formatDate(task.due_date)}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${taskStatus.color} ${taskStatus.textColor}`}
                      >
                        {taskStatus.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority Badge */}
              <div className="shrink-0">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${taskPriority.lightColor} ${taskPriority.textColor}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${taskPriority.color}`}
                  ></span>
                  {taskPriority.label}
                </div>
              </div>
            </div>

            {/* Hover Action Bar */}
            <div className="hidden sm:flex gap-3 px-6 py-3 bg-slate-700/30 border-t border-slate-600 group-hover:bg-slate-700/50 transition-colors">
              <Link href={`/dashboard/tasks/${task.id}/edit`}>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </Link>
              <DeleteTaskModal taskId={task.id} taskTitle={task.title} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
