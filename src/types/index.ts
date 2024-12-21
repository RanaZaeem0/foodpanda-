export interface FoodItem {
    food_id: number;
    name: string;
    description: string;
    price: number;
    restaurant_id: number;
  }
  
 export  interface Restaurant {
    address: string;
    created_at: string; // ISO date string
    description: string;
    food_items: FoodItem[];
    image_url: string;
    name: string;
    phone_number: string;
    restaurant_id: number;
    updated_at: string; // ISO date string
  }
  