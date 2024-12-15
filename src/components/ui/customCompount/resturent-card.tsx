import Image from "next/image"
import { Star, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface RestaurantCardProps {
  imageUrl: string
  name: string
  minOrderRange: string
  rating: number
  reviewCount: number
}

export default function RestaurantCard({
  imageUrl,
  name,
  minOrderRange,
  rating,
  reviewCount
}: RestaurantCardProps) {
  return (
    <div className="flex items-center space-x-4 p-4   ">
      <div className="flex-shrink-0">
        <Image
          src={imageUrl}
          alt={name}
          width={120}
          height={120}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{name}</h3>
<div className="flex">
<p className="text-sm text-pink-400 pr-2 font-medium">Free Delivery</p>
<p className="text-sm text-gray-600">Min. order: {minOrderRange}</p>
</div>
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          See {reviewCount} reviews
        </a>
      </div>
      <div className="flex-shrink-0">
        <Button variant="outline" size="sm">
          <Heart className="w-4 h-4 mr-2" />
          Add to favorite
        </Button>
      </div>
    </div>
  )
}

