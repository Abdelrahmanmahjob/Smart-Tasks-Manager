"use client"
import { useState, useTransition } from "react"
import { deleteTask } from "@/app/lib/actions"
import { showToast } from "nextjs-toast-notify"
import Button from "@/app/ui/Button"

export default function DeleteTaskModal({
  taskId,
  taskTitle,
}: {
  taskId: string
  taskTitle: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTask(taskId)
      if (result.success) {
        showToast.success(result.message, { position: "top-right" })
        setIsOpen(false)
      } else {
        showToast.error(result.message)
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Are you sure?</h3>
            <p className="text-slate-400 mb-6">
              You are about to delete{" "}
              <span className="text-white font-semibold">"{taskTitle}"</span>.
              This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                variant="secondary"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Yes, Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
