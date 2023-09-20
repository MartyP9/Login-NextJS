import User from "@/components/User"
import { buttonVariants } from "@/components/ui/button"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)
    
  return (
    <div className="flex flex-col items-center">
        <h1 className="text-2xl mb-2">HOMEPAGE</h1>
        <Link className={buttonVariants()} href='/admin'> Open My Admin Panel</Link>
    </div>
  )
}
