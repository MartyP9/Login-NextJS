'use client'

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { UserCircle2 } from 'lucide-react';
import Link from "next/link";

const UserAccountNav = () => {
  return (
    <>  
    <div className="flex ">

      <Button variant='destructive' onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
      })}>
        Sign Out
      </Button>
      <Link href="/profile">
        <UserCircle2 size={40}/>
      </Link>
    </div>
      </>
  )
}

export default UserAccountNav