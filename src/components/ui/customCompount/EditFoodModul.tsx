import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Food {
  id: number
  name: string
  description: string
  price: number
  image_url: string
}

interface EditFoodModalProps {
  food: Food
  isOpen: boolean
  onClose: () => void
  onEdit: (editedFood: Food) => void
}

export function EditFoodModal({ food, isOpen, onClose, onEdit }: EditFoodModalProps) {
  const [name, setName] = useState(food.name)
  const [description, setDescription] = useState(food.description)
  const [price, setPrice] = useState(food.price.toString())
  const [imageUrl, setImageUrl] = useState(food.image_url)

  useEffect(() => {
    setName(food.name)
    setDescription(food.description)
    setPrice(food.price.toString())
    setImageUrl(food.image_url)
  }, [food])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEdit({
      ...food,
      name,
      description,
      price: parseFloat(price),
      image_url: imageUrl,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Food Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image_url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image_url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

