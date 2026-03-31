"use client"

import { handleSignOut } from "@/app/lib/actions"
import {
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  ListBulletIcon,
  PowerIcon,
} from "@heroicons/react/16/solid"
import { clsx } from "clsx"
import { usePathname } from "next/navigation"

import Link from "next/link"
import Button from "../Button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Projects", href: "/dashboard/projects", icon: FolderIcon },
  { name: "Tasks", href: "/dashboard/tasks", icon: ListBulletIcon },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Cog6ToothIcon,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border-subtle bg-bg-elevated/90 px-4 py-6 backdrop-blur">
      <div className="mb-8 px-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-fg-muted">
          Smart
        </span>
        <div className="mt-1 text-lg font-semibold text-fg-strong">
          Tasks Manager
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isDashboardHome = item.href === "/dashboard"

          const isActive = isDashboardHome
            ? pathname === item.href
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-brand-soft hover:text-fg-strong",
                {
                  "bg-brand-soft text-fg-strong": isActive,
                  "text-fg-muted": !isActive,
                },
              )}
            >
              <item.icon className="h-5 w-5 text-fg-default/80" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-6 border-t border-border-subtle pt-4 text-xs text-fg-muted">
        <form action={handleSignOut}>
          <Button
            variant="ghost"
            className="flex h-12 items-center gap-2 rounded-md p-3 hover:bg-red-700 "
            type="submit"
          >
            <PowerIcon className="w-6" />
            <span>Sign Out</span>
          </Button>
        </form>
      </div>
    </aside>
  )
}
