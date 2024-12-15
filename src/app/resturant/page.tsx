import { ShoppingBag } from 'lucide-react'
import { MenuCategories } from "@/components/ui/customCompount/Food-category-header"
import { MenuItem } from "@/components/ui/customCompount/foodMenu"
import RestaurantCard from '@/components/ui/customCompount/resturent-card'

const popularItems = [
  {
    name: "Exclusive Deal 1",
    description: "Fire special Zinger burger with fries & 345 ml soft drink",
    price: 594.15,
    originalPrice: 699,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Cheesy Corn Dog 2pcs With Fires",
    description: "Single Serve",
    price: 476,
    originalPrice: 560,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Zinger Burger",
    description: "Serve 1 Zinger patty, mayo, sauces & bun",
    price: 509.15,
    originalPrice: 599,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Zinger Burger",
    description: "Serve 1 Zinger patty, mayo, sauces & bun",
    price: 509.15,
    originalPrice: 599,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Zinger Burger",
    description: "Serve 1 Zinger patty, mayo, sauces & bun",
    price: 509.15,
    originalPrice: 599,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Zinger Burger",
    description: "Serve 1 Zinger patty, mayo, sauces & bun",
    price: 509.15,
    originalPrice: 599,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Zinger Burger",
    description: "Serve 1 Zinger patty, mayo, sauces & bun",
    price: 509.15,
    originalPrice: 599,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Zinger Burger",
    description: "Serve 1 Zinger patty, mayo, sauces & bun",
    price: 509.15,
    originalPrice: 599,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Zinger Burger",
    description: "Serve 1 Zinger patty, mayo, sauces & bun",
    price: 509.15,
    originalPrice: 599,
    image: "/placeholder.svg?height=100&width=100"
  },
]

export default function RestaurantPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
        <RestaurantCard  imageUrl={"https://images.deliveryhero.io/image/fd-pk/LH/llsl-listing.jpg?width=400&height=225"}
  name={"Burger N` Brother"}
  minOrderRange={"150"}
  rating={4}
  reviewCount={200} />
      <MenuCategories />
      <main className="container py-6">
        <div className="grid md:grid-cols-[1fr,300px] gap-6">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">👍 Popular</h2>
              <div className="grid gap-4">
                {popularItems.map((item) => (
                  <MenuItem key={item.name} {...item} />
                ))}
              </div>
            </section>
          </div>
          <div className="hidden md:block">
            <div className="sticky top-32 border rounded-lg p-4 bg-white">
              <div className="flex flex-col items-center justify-center h-60">
                <div className="w-24 h-24 bg-pink-100 rounded-full mb-4 flex items-center justify-center">
                  <ShoppingBag className="h-12 w-12 text-pink-500" />
                </div>
                <h3 className="font-semibold text-lg">Hungry?</h3>
                <p className="text-sm text-center text-muted-foreground">
                  You haven't added anything to your cart!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

