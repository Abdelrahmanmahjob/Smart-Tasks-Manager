"use client"

import { useRouter } from "next/navigation"
import { deleteProject } from "@/app/lib/actions"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useTransition } from "react"

export default function DeleteProjectModal({
  id,
  name,
}: {
  id: string
  name: string | undefined
}) {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const handleDelete = async () => {
    startTransition(async () => {
      await deleteProject(id)
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-center">
      <div className="bg-slate-900 border border-red-900/30 w-full max-w-sm rounded-2xl shadow-2xl p-8 animate-in zoom-in duration-200">
        <div className="w-16 h-16 bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrashIcon className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Delete Project?</h2>
        <p className="text-slate-400 text-sm mb-8">
          Are you sure you want to delete{" "}
          <span className="text-white font-semibold">"{name}"</span>? This
          action cannot be undone and all tasks will be lost.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 px-4 py-3 rounded-xl cursor-pointer bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-3 rounded-xl cursor-pointer bg-red-600 text-white font-medium hover:bg-red-500 transition-colors shadow-lg shadow-red-600/20"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
