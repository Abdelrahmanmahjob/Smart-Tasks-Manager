import Sidebar from "../ui/dashboard/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-bg-root text-fg-default">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-6xl rounded-xl border border-border-subtle bg-bg-surface/90 p-8 shadow-(--shadow-soft)">
          {children}
        </div>
      </main>
    </div>
  )
}
