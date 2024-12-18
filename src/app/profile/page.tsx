
'use client'
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react"
import { log } from "node:console"


export default function page(){
  const session =  useSession()
  console.log(session.data?.user);
  const data   = session.data?.user
    return <>
    <div className="flex flex-col items-center justify-center w-full ">
    <div className=" w-1/2 flex flex-col">
    <h2>My Profile</h2>
        <Input name="name" id="" placeholder={data?.name && "name"} />
        <Input name="emial" id="" placeholder={data?.email} />
        <button>Save</button>
    </div>
    <div className="w-1/2 flex flex-col">
    <h2>My Profile</h2>
        <Input name="name" id="" placeholder={data?.name} />
        <Input name="emial" id="" placeholder={data?.email} />
        <button>Save</button>
    </div>
    </div>
    </>
}