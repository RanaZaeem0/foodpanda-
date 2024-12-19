'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addFood } from '../actions/addFood'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { log } from 'console'

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  restaurant_id: z.number().positive("Restaurant ID must be a positive number"),
  price: z.number().positive("Price must be a positive number"),
})

export function AddFoodForm() {
  const [serverErrors, setServerErrors] = useState<Record<string, string[]> | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      restaurant_id: 0,
      price: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setServerErrors(null)
    setSuccessMessage(null)
console.log(values,"vales");

    try {
        const response = await fetch('http://localhost:3000/api/restaurant/food/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
          body: JSON.stringify(values),
        })
  
        if (!response.ok) {
          throw new Error('Failed to submit data')
        }
  
        const result = await response.json()
      //   toast({
      //     title: "Success",
      //     description: "Burger data submitted successfully",
      //   })
        form.reset()
        console.log(result,"result")
      } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to submit burger data",
      //     variant: "destructive",
      //   })
      } finally {
      }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter food name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter food description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="restaurant_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurant ID</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Food Item</Button>
      </form>
      {serverErrors && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {Object.entries(serverErrors).map(([key, errors]) => (
            <p key={key}>{errors.join(', ')}</p>
          ))}
        </div>
      )}
      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
    </Form>
  )
}

