import { verifyAdminSession } from "@/lib/admin-auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }) {
  const isAuthenticated = await verifyAdminSession()

  if (!isAuthenticated) {
    redirect("/auth")
  }

  return children
}
