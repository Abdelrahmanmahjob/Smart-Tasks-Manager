import EmailForm from "@/app/ui/settings/EmailForm"
import PasswordForm from "@/app/ui/settings/PasswordForm"
import { auth } from "@/auth"
import { sql } from "@vercel/postgres"

export default async function AccountPage() {
  const session = await auth()
  const id = session?.user?.id

  const { rows } = await sql`
    SELECT email FROM users WHERE id = ${id}
  `
  const dbUser = rows[0]
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Email Section */}
      <EmailForm userInfo={dbUser.email} />

      <hr className="border-slate-800/50" />

      {/* Password Section */}
      <PasswordForm />

      <hr className="border-slate-800/50" />

      {/* Account Status */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">Account Status</h2>
        <div className="bg-slate-900/30 border border-slate-800/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Account Status</p>
              <p className="text-sm text-slate-400 mt-1">
                Your account is active and in good standing
              </p>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
