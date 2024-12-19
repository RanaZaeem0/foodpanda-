import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { NEXT_AUTH } from '@/auth/auth';
import db from "@/db"



export async function GET(req: NextResponse) {

  const allResturant = await db.restaurant.findMany(
    {
        include:{
            food_items:true
        }
    }
  )
  if (!allResturant) {
    return NextResponse.json({ message: "can't find restaurant food" }, { status: 402});
  }
  return NextResponse.json({
    msg: "All Restaurant ",
    allResturant
  });

}