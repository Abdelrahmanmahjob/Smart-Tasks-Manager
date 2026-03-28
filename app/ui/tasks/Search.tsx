"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { useDebouncedCallback } from "use-debounce"

export default function Search() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const isSearchEmpty = !searchParams.get("search")?.toString()
    if (isSearchEmpty && inputRef.current) {
      inputRef.current.value = ""
    }
  }, [searchParams])

  const handleSearchChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("page")
    if (term) {
      params.set("search", term)
    } else {
      params.delete("search")
    }

    replace(`${pathName}?${params.toString()}`)
  }, 300)

  return (
    <div className="w-full">
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search tasks by title or project..."
          className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          onChange={(e) => handleSearchChange(e.target.value)}
          defaultValue={searchParams.get("search")?.toString() || ""}
          ref={inputRef}
        />
      </div>
    </div>
  )
}
