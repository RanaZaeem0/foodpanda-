import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: number
  customerName: string
  items: string[]
  total: number
  status: string
}

interface OrderListProps {
  orders: Order[]
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>{order.items.join(", ")}</TableCell>
            <TableCell>${order.total.toFixed(2)}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function getStatusVariant(status: string): "default" | "secondary" | "destructive" {
  switch (status) {
    case "Preparing":
      return "default"
    case "Ready for Pickup":
      return "secondary"
    case "Delivered":
      return "destructive"
    default:
      return "default"
  }
}

