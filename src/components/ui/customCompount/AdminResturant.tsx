"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StarIcon } from 'lucide-react'
import Link from "next/link"
import { useDeleteUserResturantMutation, useGetUserRestaurantQuery } from "@/lib/api/api"
import { Item } from "@radix-ui/react-menubar"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { RestaurantType } from "@/types/resturant"

interface Restaurant {
  restaurant_id: number
  name: string
  address: string
  rating: number
  image_url: string,
  minOrderRange:number,

}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export  function AdminRestaurant() {
  const UserRestaurant = useGetUserRestaurantQuery({})
  const params = useParams()
  const router = useRouter()
  const restaurantId =params.restaurant_id
  const [deleteRestaurant]  = useDeleteUserResturantMutation()
  const handleDeleteResturant  =async ()=>{
    try {
      console.log(restaurantId,"inmuatute");
      
      const deletes = await  deleteRestaurant(restaurantId)
      console.log(deletes);
      router.push('/')
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  if(UserRestaurant.isLoading){
    return <>
    <h1>Loading ...</h1>
    </>
    }  

    console.log(UserRestaurant,"userres");
    
  const ress  =  UserRestaurant.data?.userRestaurent.filter((i:any) => i.restaurant_id == restaurantId);

  const openRestaurant = ress
  console.log(Array.isArray(openRestaurant)); 
 
   


 


  return (
<>
<div className="">
  {openRestaurant.map((item:RestaurantType,index:number)=>{
    console.log(item?.restaurant_id,"res");
    
        return   <Card  key={index}>
      <CardHeader>
        <CardTitle>{item?.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={item?.image_url} alt={item?.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <p className="text-sm text-gray-500">{item?.address}</p>
        <div className="flex items-center mt-2">
          <StarIcon className="w-5 h-5 text-yellow-400" />
          <span className="ml-1">{item?.rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline">
          <Link href={`admin/restaurant/${item?.restaurant_id}/orders`}>View Orders</Link>
        </Button>
    
       { !restaurantId  ?  <Button asChild>
          <Link href={`http://localhost:3000/admin/restaurant/${item?.restaurant_id}`}>Manage Menu</Link>
        </Button>
        :  <Button  onClick={handleDeleteResturant}>
        Delete
      </Button> 
        }
      </CardFooter>
    </Card>
  })
    }
</div>
</>
  )
}

