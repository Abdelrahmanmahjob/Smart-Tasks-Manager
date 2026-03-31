"use client"

import { UserIcon, ShieldCheckIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SettingsSidebar() {
  const pathName = usePathname()
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: UserIcon,
      href: "/dashboard/settings/profile",
      description: "Personal information",
    },
    {
      id: "account",
      label: "Account",
      icon: ShieldCheckIcon,
      href: "/dashboard/settings/account",
      description: "Security & password",
    },
  ]

  return (
    <nav className="space-y-1 p-4">
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
        Settings
      </div>
      {tabs.map((tab) => {
        const isActive = pathName === tab.href
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`flex items-start gap-3 px-4 py-3 rounded-lg font-medium transition-all cursor-pointer group ${
              isActive
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
            }`}
          >
            <tab.icon className="w-5 h-5 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{tab.label}</p>
              <p
                className={`text-xs mt-0.5 ${
                  isActive
                    ? "text-indigo-200"
                    : "text-slate-500 group-hover:text-slate-400"
                }`}
              >
                {tab.description}
              </p>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
