export interface RestaurantType {
    accepts_instructions: boolean;
    address: string;
    address_line2: string;
    created_at: string;
    customer_type: string;
    delivery_provider: string;
    description: string;
    image_url: string;
    is_active: boolean;
    is_best_in_city: boolean;
    latitude: number;
    longitude: number;
    minimum_delivery_time: number;
    minimum_order_amount: number;
    name: string;
    original_delivery_fee: number;
    phone_number: string;
    rating: number;
    restaurant_id: number;
    review_number: number;
    tag: string;
    updated_at: string;
    user_id: number;
  }
  