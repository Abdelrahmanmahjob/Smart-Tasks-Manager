import SettingsSidebar from "@/app/ui/settings/SettingsSidebar"
import { auth } from "@/auth"

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await auth()
  // const user = session?.user

  return (
    <div className="flex min-h-screen bg-bg-root text-fg-default">
      <aside className="w-full md:w-56">
        <SettingsSidebar />
      </aside>
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-6xl rounded-xl border border-border-subtle bg-bg-surface/90 p-8 shadow-(--shadow-soft)">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Settings
            </h1>
            <p className="text-slate-400">
              Manage your workspace and account preferences.
            </p>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
