import { CategoriesGrid } from '@/components/ui/customCompount/MartCategoryGrid'
import { PromoBanner } from '@/components/ui/customCompount/PromoBanner'
import { ShopHeader } from '@/components/ui/customCompount/pandaMartHeader'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      <main className="container mx-auto px-4">
        <PromoBanner />
        <CategoriesGrid />
      </main>
    </div>
  )
}

