import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { NEXT_AUTH } from '@/auth/auth';
import db from "@/db";

const requestBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  restaurant_id: z.number(),
  price: z.number(),
});

export async function POST(req: NextRequest) {
  let body;

  // Handle JSON parsing errors
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  // Validate request body
  const parseResult = requestBodySchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.format() },
      { status: 400 },
    );
  }

  // Validate session
  const session = await getServerSession(NEXT_AUTH);
  if (!session || !session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, description, restaurant_id, price } = parseResult.data;

  // Handle database operations with error handling
  try {
    const createResturent = await db.foodItem.create({
      data: {
        name,
        description,
        price,
        image_url: "https://example.com/default-image.jpg", // Replace with dynamic value if needed
        restaurant_id,
        category_id:1
      },
    });

    return NextResponse.json(createResturent);
  } catch (error) {
    return NextResponse.json(
      { message: "Database operation failed", error: error.message },
      { status: 500 },
    );
  }
}
