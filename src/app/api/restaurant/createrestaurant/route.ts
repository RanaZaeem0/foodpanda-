import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { NEXT_AUTH } from '@/auth/auth';
import db from "@/db"

const requestBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  phone_number:z.string(),
  address:z.string(),
});

export async function POST(req: NextRequest) {
  const parseResult = requestBodySchema.safeParse(await req.json());

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }
   const session = await getServerSession(NEXT_AUTH);
   if (!session || !session?.user) {
     return NextResponse.json({message:"Unauthoriztede"}, { status: 401 });
  }
  const {name,description,phone_number,address }  = parseResult.data
  
   const user_id  = session.user.user_id
  console.log(session.user)
  const createResturent = await db.restaurant.create({
    data:{
      name,
      description,
      user_id,
      phone_number,
      address,
      image_url:"",

    }
  })
  

  return NextResponse.json(createResturent);
}

export async  function GET(req:NextResponse){

   const session = await getServerSession(NEXT_AUTH);
   if (!session || !session?.user || !session?.user?.user_id) {
     return NextResponse.json({message:"Unauthoriztede"}, { status: 401 });
  }
  const user_id  = session.user.user_id

  const userRestaurent  = await db.restaurant.findMany({
    where: {
      user_id: user_id, // Match user_id
    },
    select: {
      user_id: true, // Specify the fields you want to retrieve
    },
  })
  if(!userRestaurent){
    return NextResponse.json({message:"Can't find resturent"}, { status: 401 });
  }
  return NextResponse.json({
    msg:"User Restaurent ",
    userRestaurent
  });
  
}