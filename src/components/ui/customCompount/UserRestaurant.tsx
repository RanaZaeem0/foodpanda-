import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StarIcon } from 'lucide-react'
import Link from "next/link"

interface Restaurant {
  restaurant_id: number
  name: string
  address: string
  rating: number
  image_url: string
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{restaurant.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <p className="text-sm text-gray-500">{restaurant.address}</p>
        <div className="flex items-center mt-2">
          <StarIcon className="w-5 h-5 text-yellow-400" />
          <span className="ml-1">{restaurant.rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline">
          <Link href={`/restaurants/${restaurant.restaurant_id}/orders`}>View Orders</Link>
        </Button>
        <Button asChild>
          <Link href={`/restaurants/${restaurant.restaurant_id}`}>Manage Menu</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

