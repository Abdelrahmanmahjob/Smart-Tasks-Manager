"use client"
import { useActionState } from "react"
import { updateEmail } from "@/app/lib/actions"

export default function EmailForm({ userInfo }: { userInfo: string }) {
  const initialState = { message: null, errors: {} }

  const [state, formAction, isPending] = useActionState(
    updateEmail,
    initialState,
  )

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-white">Email Address</h2>
      <form action={formAction} className="space-y-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Primary Email
          </label>
          <input
            name="email"
            type="email"
            defaultValue={userInfo}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
          />
          {state.errors?.email && (
            <p className="text-sm text-red-500 mt-1">{state.errors.email}</p>
          )}
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Email"}
          </button>
        </div>
        {state.success ? (
          <p className="text-sm text-green-500 mt-2">{state.message}</p>
        ) : (
          <p className="text-sm text-red-500 mt-2">{state.message}</p>
        )}
      </form>
    </section>
  )
}
