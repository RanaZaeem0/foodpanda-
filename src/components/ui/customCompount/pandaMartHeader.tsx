'use client'

import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ShopHeader() {
  return (
    <div className="bg-[#E21B70]">
      <div className="container mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
        <div className="text-2xl font-bold text-white">
          panda<span className="text-black">mart</span>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            placeholder="Search products"
            className="w-full pl-10"
          />
        </div>

        <Button variant="secondary">Shop information</Button>
      </div>
    </div>
  )
}

