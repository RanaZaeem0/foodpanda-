



import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '@/auth/auth';
import db from '@/db';

export async function DELETE(req: NextRequest, context: { params: { restaurant_id: string } }) {

    // Extract params from context
    const { params } = context;
    const { restaurant_id } = params;

    // Ensure params are valid
    if (!restaurant_id) {
      return NextResponse.json({ message: "Invalid restaurant ID" }, { status: 400 });
    }

    // Parse restaurant_id to a number
    const restaurant_idN = Number(restaurant_id);
    if (isNaN(restaurant_idN)) {
      return NextResponse.json({ message: "Invalid restaurant ID" }, { status: 400 });
    }
    
    // Get the user session
    const session = await getServerSession(NEXT_AUTH);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.user_id;
  
    // Attempt to delete the restaurant
    const userRestaurant = await db.restaurant.delete({
      where: { 
        restaurant_id: restaurant_idN, 
        user_id:user_id 
      },
    });

    if (!userRestaurant) {
      return NextResponse.json({ message: "Restaurant not found or not owned by the user" }, { status: 404 });
    }

    // Successful deletion response
    return NextResponse.json({
      message: "Restaurant deleted successfully",
      userRestaurant,
    });
  
}
