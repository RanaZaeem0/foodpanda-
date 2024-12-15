'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

const categories = [
  { name: "Popular", count: 6 },
  { name: "Deals For One", count: 2 },
  { name: "Exclusive Deals", count: 10 },
  { name: "Starters", count: 4 },
  { name: "Fast Food", count: 17 },
  { name: "Wrap", count: 3 },
  { name: "Beverages", count: 2 },
]

export function MenuCategories() {
  return (
    <div className="sticky top-20 bg-white z-40 border-b">
      <div className="container py-4 flex">
        <div className="relative items-center justify-center mb-4">
          <Search className="absolute left-3 top-5.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search in menu" className="pl-10" />
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="ghost"
              className="whitespace-nowrap"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

