'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function PromoBanner() {
  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <Card className="flex-shrink-0 w-full">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Win Free Groceries for 6 Months"
            width={800}
            height={400}
            className="w-full h-[400px] object-cover"
          />
        </Card>
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

