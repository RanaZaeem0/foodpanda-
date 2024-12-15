'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Minus, Plus, X } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CheckoutSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutSidebar({ isOpen, onClose }: CheckoutSidebarProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    // In a real app, you'd fetch this from a state management solution or API
    setCartItems([
      { id: '1', name: 'Cheeseburger', price: 8.99, quantity: 1 },
      { id: '2', name: 'Pizza Margherita', price: 12.99, quantity: 2 },
    ])
  }, [])

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Your Order</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-10rem)] p-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, -1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-2">{item.quantity}</span>
              <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <Button className="w-full">
          Checkout
        </Button>
      </div>
    </div>
  )
}

