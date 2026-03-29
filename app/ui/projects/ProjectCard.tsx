import { FolderIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { Project } from "@/app/lib/definitions"
import Link from "next/link"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative bg-slate-900/40 border border-slate-800 p-5 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4">
        <div
          className="p-3 rounded-xl"
          style={{
            backgroundColor: `${project.color}20`,
            color: project.color,
          }}
        >
          <FolderIcon className="w-6 h-6" />
        </div>

        <button className="text-slate-500 hover:text-white transition-colors">
          <EllipsisVerticalIcon className="w-5 h-5" />
        </button>
      </div>

      <Link
        href={`/dashboard/projects/${project.id}/detail`}
        className="cursor-pointer "
      >
        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors mb-1">
          {project.name}
        </h3>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          <span>{project.tasks_count} Tasks</span>
        </div>
      </Link>

      <div
        className="absolute bottom-0 left-0 h-1 rounded-b-2xl transition-all duration-300 group-hover:w-full w-0"
        style={{ backgroundColor: project.color }}
      />
    </div>
  )
}
