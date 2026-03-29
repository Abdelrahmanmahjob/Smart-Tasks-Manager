import Link from "next/link"
import { fetchUserTasks, fetchTasksPagesCount } from "@/app/lib/data"
import Button from "@/app/ui/Button"
import { Card } from "@/app/ui/Card"
import Search from "@/app/ui/tasks/Search"
import Pagination from "@/app/ui/Pagination"
import TasksContainer from "@/app/ui/tasks/TasksContainer"

export default async function TasksPage({
  searchParams, // ✅ Server Components تستقبل searchParams كـ prop
}: {
  searchParams?: {
    search?: string
    page?: string
  }
}) {
  const query = await searchParams
  const search = query?.search || ""
  const currentPage = query?.page ? Number(query.page) : 1

  const tasks = await fetchUserTasks({
    searchTerm: search,
    currentPage: currentPage,
  })

  const totalPages = await fetchTasksPagesCount({ searchTerm: search })

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Tasks
            </h1>
            <p className="mt-2 text-slate-400 text-lg">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            </p>
          </div>
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
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <Search />
      </div>

      {/* Tasks Grid */}
      <div className="max-w-7xl mx-auto">
        {search && tasks.length === 0 ? (
          <Card className="col-span-full">
            <div className="flex flex-col items-center justify-center py-20 px-6">
              <div className="text-6xl mb-4 opacity-50">📋</div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                No Tasks Found
              </h3>
              <p className="text-slate-400 text-center mb-6">
                Try adjusting your search terms
              </p>
              <Link href={"/dashboard/tasks"}>
                <Button variant="primary">Clear Search</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <TasksContainer tasks={tasks} />
        )}
      </div>
      <Pagination totalPages={Number(totalPages)} />
    </div>
  )
}
