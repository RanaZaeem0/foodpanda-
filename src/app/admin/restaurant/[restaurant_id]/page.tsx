import { AdminRestaurant } from "@/components/ui/customCompount/AdminResturant"
import { MenuItem } from "@/components/ui/customCompount/foodMenu"

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
    <div className="min-h-screen bg-gray-50 ">
        <AdminRestaurant/>
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

        </div>
      </main>
    </div>
  )
}

