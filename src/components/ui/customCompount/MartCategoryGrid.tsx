import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { name: 'Pandafest', image: '/placeholder.svg?height=80&width=80' },
  { name: 'Cadbury Mini Fingers', image: '/placeholder.svg?height=80&width=80' },
  { name: 'Shan Foods', image: '/placeholder.svg?height=80&width=80' },
  { name: 'Essential Living', image: '/placeholder.svg?height=80&width=80' },
  { name: 'Fruits & Vegetables', image: '/placeholder.svg?height=80&width=80' },
  { name: 'Meat & Seafood', image: '/placeholder.svg?height=80&width=80' },
  { name: 'Dairy Products', image: '/placeholder.svg?height=80&width=80' },
  { name: 'Bakery & Breakfast', image: '/placeholder.svg?height=80&width=80' },
]

export function CategoriesGrid() {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">All categories</h2>
        <Link href="/categories" className="text-[#E21B70] text-sm">
          View All (33)
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={80}
              height={80}
              className="mb-2"
            />
            <span className="text-sm">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

