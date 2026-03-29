"use client"

import { useRouter } from "next/navigation"
import { createProject } from "@/app/lib/actions"
import { useActionState } from "react"

const COLORS = [
  "#6366f1",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#8b5cf6",
]

export default function CreateProjectModal() {
  const router = useRouter()
  const initialState = { message: null, errors: {} }
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState,
  )
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <form action={formAction} className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Create New Project
          </h2>

          <div className="space-y-5">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Project Name
              </label>
              <input
                name="name"
                required
                placeholder="e.g. Marketing Campaign"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-3">
                Project Color
              </label>
              <div className="flex gap-3 flex-wrap">
                {COLORS.map((color) => (
                  <label key={color} className="relative cursor-pointer group">
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      className="peer sr-only"
                      defaultChecked={color === COLORS[0]}
                    />
                    <div
                      className="w-8 h-8 rounded-full border-2 border-transparent peer-checked:border-white peer-checked:scale-110 transition-all shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-4 py-3 rounded-xl cursor-pointer bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl cursor-pointer bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
            >
              {isPending ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
