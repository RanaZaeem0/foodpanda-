import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { NEXT_AUTH } from '@/auth/auth';
import db from "@/db"



export async function GET(req: NextResponse) {
  const session = await getServerSession(NEXT_AUTH);
  if (!session || !session?.user) {
    return NextResponse.json({ message: "Unauthoriztede" }, { status: 401 });
  }
  const {restaurant_id} = await req.json()
  const restaurantFood = await db.foodItem.findMany({
    where:{
      restaurant_id
    }
  })
  if (!restaurantFood) {
    return NextResponse.json({ message: "can't find restaurant food" }, { status: 402});
  }
  return NextResponse.json({
    msg: "Restaurant food",
    restaurantFood
  });

}