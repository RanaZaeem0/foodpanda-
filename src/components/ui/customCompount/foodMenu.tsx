import Image from "next/image"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface MenuItemProps {
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
}

export function MenuItem({ name, description, price, originalPrice, image }: MenuItemProps) {
  return (
    <div className="flex items-start space-x-4 p-4 border rounded-lg">
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-2">
          <span className="font-semibold">Rs. {price}</span>
          {originalPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              Rs. {originalPrice}
            </span>
          )}
        </div>
      </div>
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
        <Button
          size="icon"
          className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full shadow-lg"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

