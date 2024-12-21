'use client'

import { useState, useEffect } from 'react'
import { FoodList } from '@/components/ui/customCompount/AdminFoodList'
import { Button } from '@/components/ui/button'
import { AddFoodModal } from '@/components/ui/customCompount/AddFoodDialog'

interface Restaurant {
  restaurant_id: number
  name: string
  address: string
  rating: number
  image_url: string
  foods: Food[]
}

interface Food {
  id: number
  name: string
  description: string
  price: number
  image_url: string
}

// This is a mock function to simulate fetching restaurant data
const fetchRestaurantData = async (id:1): Promise<Restaurant> => {
  // In a real application, this would be an API call
  const restaurants = [
    {
      restaurant_id: 1,
      name: "Tasty Bites",
      address: "123 Main St",
      rating: 4.5,
      image_url: "https://example.com/tasty-bites.jpg",
      foods: [
        { id: 1, name: "Burger Deluxe", description: "Juicy beef patty with all the fixings", price: 12.99, image_url: "https://example.com/burger.jpg" },
        { id: 2, name: "Veggie Pasta", description: "Fresh vegetables in a creamy sauce", price: 10.99, image_url: "https://example.com/pasta.jpg" },
      ]
    },
    {
      restaurant_id: 2,
      name: "Spice Haven",
      address: "456 Elm St",
      rating: 4.2,
      image_url: "https://example.com/spice-haven.jpg",
      foods: [
        { id: 3, name: "Chicken Curry", description: "Tender chicken in a spicy curry sauce", price: 14.99, image_url: "https://example.com/curry.jpg" },
        { id: 4, name: "Vegetable Biryani", description: "Fragrant rice dish with mixed vegetables", price: 11.99, image_url: "https://example.com/biryani.jpg" },
      ]
    },
    {
      restaurant_id: 3,
      name: "Burger Palace",
      address: "789 Oak St",
      rating: 4.7,
      image_url: "https://example.com/burger-palace.jpg",
      foods: [
        { id: 5, name: "Classic Cheeseburger", description: "Our signature beef patty with melted cheese", price: 9.99, image_url: "https://example.com/cheeseburger.jpg" },
        { id: 6, name: "Crispy Chicken Sandwich", description: "Crispy fried chicken breast with special sauce", price: 8.99, image_url: "https://example.com/chicken-sandwich.jpg" },
      ]
    }
  ];

  const restaurant = restaurants.find(r => r.restaurant_id === parseInt(id));
  if (!restaurant) {
    throw new Error('Restaurant not found');
  }
  return restaurant;
};

export default function RestaurantDetailsPage({ params }: { params: { id: string } }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const data = await fetchRestaurantData(params.id)
        setRestaurant(data)
      } catch (error) {
        console.error('Failed to load restaurant:', error)
      }
    }

    loadRestaurant()
  }, [params.id])

  const handleAddFood = async (newFood: Omit<Food, 'id'>) => {
    if (restaurant) {
      const addedFood = { ...newFood, id: Date.now() } // Generate a temporary ID
      setRestaurant({
        ...restaurant,
        foods: [...restaurant.foods, addedFood as Food]
      })
      setIsAddModalOpen(false)
    }
  }

  const handleEditFood = async (editedFood: Food) => {
    if (restaurant) {
      setRestaurant({
        ...restaurant,
        foods: restaurant.foods.map(food => food.id === editedFood.id ? editedFood : food)
      })
    }
  }

  const handleDeleteFood = async (foodId: number) => {
    if (restaurant) {
      setRestaurant({
        ...restaurant,
        foods: restaurant.foods.filter(food => food.id !== foodId)
      })
    }
  }

  if (!restaurant) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => setIsAddModalOpen(true)} className="mb-4">Add New Food Item</Button>
      <FoodList foods={restaurant.foods} onEdit={handleEditFood} onDelete={handleDeleteFood} />
      <AddFoodModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddFood} />
    </div>
  )
}

