"use client"

import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { generatePagination } from "../lib/utils"
import { usePathname, useSearchParams } from "next/navigation"

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const allPages = generatePagination(currentPage, totalPages)

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="inline-flex mt-6 w-full justify-center">
      <div className="flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800 backdrop-blur-sm">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage === 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined
            if (index === 0) position = "first"
            if (index === allPages.length - 1) position = "last"
            if (allPages.length === 1) position = "single"
            if (page === "...") position = "middle"

            return (
              <PaginationNumber
                key={index}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={page === currentPage}
              />
            )
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        />
      </div>
    </div>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string
  href: string
  position?: "first" | "last" | "middle" | "single"
  isActive: boolean
}) {
  const className = `
    flex h-8 w-8 items-center justify-center text-sm border-slate-700/50 transition-all duration-200
    ${isActive ? "z-10 bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg"}
    ${page === "..." ? "pointer-events-none text-slate-600" : ""}
  `

  return isActive || page === "..." ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string
  direction: "left" | "right"
  isDisabled?: boolean
}) {
  const className = `
    flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 
    text-slate-400 transition-all duration-200
    ${isDisabled ? "pointer-events-none opacity-30" : "hover:bg-slate-800 hover:text-white hover:border-slate-700"}
  `

  const icon =
    direction === "left" ? (
      <ChevronLeftIcon className="w-5 h-5" />
    ) : (
      <ChevronRightIcon className="w-5 h-5" />
    )

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  )
}
