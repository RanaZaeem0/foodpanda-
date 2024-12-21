import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EditFoodModal } from '@/components/ui/customCompount/EditFoodModul'

interface Food {
  id: number
  name: string
  description: string
  price: number
  image_url: string
}

interface FoodListProps {
  foods: Food[]
  onEdit: (editedFood: Food) => void
  onDelete: (foodId: number) => void
}

export function FoodList({ foods, onEdit, onDelete }: FoodListProps) {
  const [editingFood, setEditingFood] = useState<Food | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {foods.map((food) => (
        <Card key={food.id}>
          <CardHeader>
            <CardTitle>{food.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={food.image_url} alt={food.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <p className="text-sm text-gray-500">{food.description}</p>
            <p className="text-lg font-bold mt-2">${food.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => setEditingFood(food)} variant="outline">Edit</Button>
            <Button onClick={() => onDelete(food.id)} variant="destructive">Delete</Button>
          </CardFooter>
        </Card>
      ))}
      {editingFood && (
        <EditFoodModal
          food={editingFood}
          isOpen={!!editingFood}
          onClose={() => setEditingFood(null)}
          onEdit={(editedFood) => {
            onEdit(editedFood)
            setEditingFood(null)
          }}
        />
      )}
    </div>
  )
}

