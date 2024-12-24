'use server'

import { NEXT_AUTH } from "@/auth/auth";
import db from "@/db"
import { getServerSession } from "next-auth";
import { z } from "zod";

const requestBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  restaurant_id: z.number().positive("Restaurant ID must be a positive number"),
  price: z.number().positive("Price must be a positive number"),
});

export async function addFoodAction(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      restaurant_id: Number(formData.get("restaurant_id")),
      price: Number(formData.get("price")),
    };

    const parseResult = requestBodySchema.safeParse(data);
    if (!parseResult.success) {
      return {
        success: false,
        message: "Invalid inputs",
        errors: parseResult.error.format(),
      };
    }

    const session = await getServerSession(NEXT_AUTH);
    if (!session || !session?.user) {
      return { 
        success: false,
        message: "Unauthorized" 
      };
    }

    const { name, description, restaurant_id, price } = parseResult.data;
    
    const createFood = await db.foodItem.create({
      data: {
        name,
        description,
        price,
        image_url: "https://example.com/default-image.jpg",
        restaurant_id,
        category_id: 1
      },
    });

    return {
      success: true,
      message: "Food item added successfully",
      data: createFood,
    };
  } catch (error) {
    console.error("Error adding food item:", error);
    return {
      success: false,
      message: "An error occurred while adding the food item",
    };
  }
}

