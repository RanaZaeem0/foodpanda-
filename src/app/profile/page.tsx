
'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { log } from "node:console"


export default function Page(){
  const session =  useSession()
  console.log(session.data?.user)
  const data   = session.data?.user 
 
 if(!data){
  return<>
  
  <h1>Login Plz</h1>
  </>
 }
 
 return <>
    <div className="flex flex-col items-center justify-center w-full ">
    <div className=" w-1/2 flex flex-col">
    <h2>My Profile</h2>
        <Input name="name" id="" placeholder={data.name || "name" } />
        <Input name="emial" id="" placeholder={data.email || "email"} />
        <button>Save</button>
    </div>
    <div className="w-1/2 flex flex-col">
    <h2>My Profile</h2>
       <Link href={"admin/restaurant/create"}>
       <Button>Create resturent</Button></Link>
       <Link href={"admin/restaurant/addfood"}>
       <Button>Add Food </Button></Link>
       <Link href={"admin/restaurant/"}>
       <Button>user resturent  </Button></Link>

    </div>
    </div>
    </>
}