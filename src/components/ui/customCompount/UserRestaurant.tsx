import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StarIcon } from 'lucide-react'
import Link from "next/link"
import { useDeleteUserResturantMutation, useGetUserRestaurantQuery } from "@/lib/api/api"
import { useParams } from "next/navigation"
import db from "@/db"



export function UserRestaurantCard() {
  const UserRestaurant = useGetUserRestaurantQuery({})
  const params = useParams()
  const restaurantId =params.restaurant_id



  
  const [deleteRestaurant]  = useDeleteUserResturantMutation()
  const handleDeleteResturant  =async ()=>{
     try {
      console.log(restaurantId,"inmuatute");
      
        const deletes = await  deleteRestaurant(restaurantId)
       console.log(deletes);
       
     } catch (error) {
      console.log(error);
      
     }
  }

   console.log(deleteRestaurant,"delted restaurant");
   


  if(UserRestaurant.isLoading){

  }


  return (
<>
<div className="">
  {
    UserRestaurant.data?.userRestaurent.map((item:any,index:number) =>{
      return     <Card key={index}>
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
        :  <Button  >
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

