"use client"

import { updatePassword } from "@/app/lib/actions"
import { useActionState } from "react"

export default function PasswordForm() {
  const initialState = { message: null, error: {} }
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialState,
  )
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Change Password</h2>
        <p className="text-sm text-slate-400 mt-1">
          Update your password to keep your account secure
        </p>
      </div>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Current Password
          </label>
          <input
            name="currentPassword"
            type="password"
            placeholder="••••••••"
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
          />
          {state.errors?.currentPassword && (
            <p className="text-xs text-red-500 mt-1">
              {state.errors.currentPassword}
            </p>
          )}
          {state.success === false && (
            <p className="text-xs text-red-500 mt-1">{state.message}</p>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
            />
            {/* {state.errors?.newPassword && (
              <p className="text-xs text-red-500 mt-1">
                {state.errors.newPassword.join(", ")}
              </p>
            )} */}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
            />
            {state.errors?.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {state.errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <div className="bg-slate-900/30 border border-slate-800/50 rounded-lg p-3 mt-3">
          <p className="text-xs text-slate-400">Password requirements:</p>
          {state.errors?.newPassword ? (
            <ul className="text-xs text-slate-500 mt-2 space-y-1 ml-3">
              <li className="text-red-500">• At least 6 characters</li>
              <li className="text-red-500">
                • At least one letter and one number
              </li>
            </ul>
          ) : (
            <ul className="text-xs text-slate-500 mt-2 space-y-1 ml-3">
              <li>• At least 6 characters</li>
              <li>• At least one letter and one number</li>
            </ul>
          )}
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-8 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-500 transition-all shadow-lg shadow-amber-600/20 cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Changing..." : "Change Password"}
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
