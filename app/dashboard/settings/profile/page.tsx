import ProfileForm from "@/app/ui/settings/ProfileForm"
import { auth } from "@/auth"
import { sql } from "@vercel/postgres"

export default async function ProfilePage() {
  const session = await auth()
  const userEmail = session?.user?.email

  const { rows } = await sql`
    SELECT name, avatar_url FROM users WHERE email = ${userEmail}
  `
  const dbUser = rows[0]

  return (
    <ProfileForm
      initialData={{
        name: dbUser?.name || "",
        avatarUrl: dbUser?.avatar_url || "",
      }}
    />
  )
}
