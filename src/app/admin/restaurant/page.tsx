'use client'
import getResturent from '@/actions/food'
import { UserRestaurantCard } from '@/components/ui/customCompount/UserRestaurant'
import { useGetUserRestaurantQuery } from '@/lib/api/api'
import React, { useState } from 'react'

 export default function Page() {
    


  return (
    <div>
          
          <div className="">
          <UserRestaurantCard  />
          </div>
    </div>
  )
}


