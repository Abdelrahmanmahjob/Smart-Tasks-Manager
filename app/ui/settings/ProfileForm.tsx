"use client"

import Image from "next/image"
import { useState, useEffect, useActionState } from "react"
import { updateProfile } from "@/app/lib/actions"
import { ProfileState } from "@/app/lib/definitions"

export default function ProfileForm({
  initialData,
}: {
  initialData: { name: string; avatarUrl: string }
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData.avatarUrl || null,
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const initialState: ProfileState = { message: null, errors: {} }
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initialState,
  )

  const isSuccess = state.message && !state.errors

  return (
    <form
      action={formAction}
      className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <div className="flex items-center gap-6 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
        <div className="w-20 h-20 rounded-full bg-indigo-600/20 border-2 border-dashed border-indigo-500/40 flex items-center justify-center overflow-hidden relative">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover"
              width={80}
              height={80}
            />
          ) : (
            <div className="bg-blue-200 h-full w-full flex items-center justify-center text-indigo-500 font-bold">
              {initialData.name.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div>
          <div className="relative group cursor-pointer w-fit">
            <input
              type="file"
              name="avatar"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <button
              type="button"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg group-hover:bg-indigo-500 transition-colors pointer-events-none"
            >
              Choose Image
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            JPG, GIF or PNG. Max size of 2MB.
          </p>
          {state.errors?.avatar && (
            <p className="text-xs text-red-500">{state.errors.avatar[0]}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">
            Display Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={initialData?.name}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          {state.errors?.name && (
            <p className="text-xs text-red-500">{state.errors.name[0]}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-fit px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Profile"}
        </button>
        {isSuccess ? (
          <p className="text-xs text-green-500">{state.message}</p>
        ) : (
          <p className="text-xs text-red-500">{state.message}</p>
        )}
      </div>
    </form>
  )
}
