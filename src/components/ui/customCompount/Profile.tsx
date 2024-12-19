'use client'

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { IoPersonOutline } from "react-icons/io5"
import { RiArrowDropDownLine } from "react-icons/ri"
import { PiCrownSimple } from "react-icons/pi";
import { TfiReceipt } from "react-icons/tfi";
import { LuReceiptText } from "react-icons/lu";
import { LiaTrophySolid } from "react-icons/lia";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"


interface PopupProps {
  trigger: React.ReactNode
  content: React.ReactNode
}

export function Popup({ trigger, content }: PopupProps) {
  const [open, setOpen] = React.useState(false)


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div>{content}</div>
      </PopoverContent>
    </Popover>
  )
}

export default function PopupExample() {
  const  session = useSession()
console.log(session.data?.user)
const handleLogout = async () => {
  await signOut({
    callbackUrl: '/signin', // Redirect after logout (optional)
  });
};
  return (
    <div className="flex items-center justify-center ">
      <Popup
        trigger={
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <IoPersonOutline />
            <span>{session.data?.user?.username}</span>
            <RiArrowDropDownLine />
          </Button>
        }
        content={
          <div className="space-y-2">
            <Link href={'/profile'}>
            <Button variant="ghost" className="w-full justify-start" >
              {session.data?.user?.name}
            </Button></Link>
            <Button variant="ghost" className="w-full justify-start" onClick={() => alert("Settings clicked!")}>
             <PiCrownSimple />  Subcribe for free delivery
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => alert("Logout clicked!")}>
            <TfiReceipt /> 
            Orders & reordering
            </Button>
            <Link href={"/profile"}>
            <Button variant="ghost" className="w-full justify-start" >
            <IoPersonOutline /> 
           Profile
            </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start" onClick={() => alert("Logout clicked!")}>
            <LuReceiptText /> 
           Vouchers
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => alert("Logout clicked!")}>
            <LiaTrophySolid /> 
           Panda rewards
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LiaTrophySolid /> 
           Logout
            </Button>
          </div>
        }
      />
    </div>
  )
}

