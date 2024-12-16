import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function CartSidebar() {
  return (
    <Card className="w-[300px] fixed right-0 top-0 h-screen">
      <CardHeader>
        <CardTitle>Your cart</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Start adding items to your cart</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <span>Subtotal</span>
          <span>Rs. 0</span>
        </div>
        <div className="flex justify-between w-full">
          <span>Total (incl. fees and tax)</span>
          <span>Rs. 0</span>
        </div>
        <Button className="w-full bg-gray-200 text-gray-500" disabled>
          Go to checkout
        </Button>
      </CardFooter>
    </Card>
  )
}

