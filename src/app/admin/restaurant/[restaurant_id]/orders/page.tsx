import { OrderList } from '@/components/ui/customCompount/OrderList'
import React from 'react'

export default function Page() {
  return (
    <div>
      <OrderList orders={{
          id: 1,
          customerName: "Tamaior",
          items: ["Zinger","biryani"],
          total: 2,
          status:"default" 
      
        }
      
      } />
    </div>
  )
}
