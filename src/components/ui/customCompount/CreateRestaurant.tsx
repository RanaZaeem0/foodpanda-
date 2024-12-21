'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  phone_number: z.string().min(5, { message: "Phone number must be at least 5 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }).optional(),
  delivery_provider: z.string().min(2, { message: "Delivery provider must be at least 2 characters." }),
  tag: z.string().min(2, { message: "Tag must be at least 2 characters." }),
  address_line2: z.string().optional(),
  minimum_order_amount: z.number(),
  minimum_delivery_time: z.number(),
  original_delivery_fee: z.number(),
  image: z
    .instanceof(File) // Check that it's a `File` object
    .refine((file) => file.type.startsWith('image/'), {
      message: "File must be an image",
    })
    .optional(), // Optional in case it's not required
});


type FormValues = z.infer<typeof formSchema>

export default function CreateRestaurant() {
  const [stage, setStage] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      phone_number: "",
      address: "",
      delivery_provider: "",
      tag: "",
      address_line2: "",
      minimum_order_amount: 0,
      minimum_delivery_time: 0,
      original_delivery_fee: 0,
      image:undefined
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      // Create a FormData object
      console.log(values,"values");
      
      const formData = new FormData();
      formData.append('image', values.image); // 'image' is the key expected by the backend
  
      // Append form values
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('phone_number', values.phone_number);
      formData.append('address', values.address);
      formData.append('delivery_provider', values.delivery_provider);
      formData.append('tag', values.tag);
      formData.append('address_line2', values.address_line2);
      formData.append('minimum_order_amount', values.minimum_order_amount.toString());
      formData.append('minimum_delivery_time', values.minimum_delivery_time.toString());
      formData.append('original_delivery_fee', values.original_delivery_fee.toString());
  
      // Append additional values
      formData.append('rating', '0');
      formData.append('latitude', '0');
      formData.append('longitude', '0');
      formData.append('review_number', '0');
  
      // Assuming the image file comes from a file input field in your form
  
      // Send the FormData object
      const response = await fetch('http://localhost:3000/api/restaurant/createrestaurant', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
  
      const result = await response.json();
      console.log(result, 'result');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }
  

  const nextStage = () => {
    if (stage === 1) {
      form.trigger(['name', 'description', 'phone_number', 'address', 'tag'])
        .then((isValid) => {
          if (isValid) setStage(2)
        })
    }
  }

  const prevStage = () => {
    if (stage === 2) setStage(1)
  }

  return (
   <>
   <div className="w-full flex">
    <div className="w-1/2">
      <img src={"/business-details.webp"}/>
    </div>
   <Card className="w-1/2  mx-auto">
      <CardHeader>
        <CardTitle>Create Restaurant - Stage {stage}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {stage === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Restaurant name" {...field} />
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
                        <Textarea placeholder="Restaurant description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag</FormLabel>
                      <FormControl>
                        <Input placeholder="Restaurant tag" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {stage === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="delivery_provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Provider</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select delivery provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="platform_delivery">Platform Delivery</SelectItem>
                          <SelectItem value="restaurant_delivery">Restaurant Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address_line2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input placeholder="Address line 2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minimum_order_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Order Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? '' : parseFloat(value));
                          }}
                          value={field.value === 0 ? '' : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minimum_delivery_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Delivery Time (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? '' : parseInt(value, 10));
                          }}
                          value={field.value === 0 ? '' : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="original_delivery_fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Delivery Fee</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? '' : parseFloat(value));
                          }}
                          value={field.value === 0 ? '' : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <div className="flex justify-between">
              {stage === 2 && (
                <Button type="button" onClick={prevStage}>
                  Previous
                </Button>
              )}
              {stage === 1 ? (
                <Button type="button" onClick={nextStage}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
   </div>
   </>
  )
}

