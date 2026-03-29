import { fetchUserProjects } from "@/app/lib/data"
import CreateProjectModal from "@/app/ui/projects/CreateProjectModal"
import ProjectCard from "@/app/ui/projects/ProjectCard"
import { PlusIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: { showModal?: string }
}) {
  const projects = await fetchUserProjects()
  const searchParamsObj = await searchParams

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-slate-400 mt-1">
            Manage and organize your task categories.
          </p>
        </div>

        <Link
          href="/dashboard/projects?showModal=true"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20"
        >
          <PlusIcon className="w-5 h-5" />
          New Project
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
          <p className="text-slate-500">
            No projects found. Create your first one!
          </p>
        </div>
      )}
      {searchParamsObj?.showModal && <CreateProjectModal />}
    </main>
  )
}
