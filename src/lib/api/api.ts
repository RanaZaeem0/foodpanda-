



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Server } from "../../constants/config"
import { Tags } from "lucide-react";


const baseQuery = fetchBaseQuery({
    baseUrl: `${Server}`,
    prepareHeaders: (headers) => {
    
  
      // Returning the modified headers
      return headers;
    },
  });

const api = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ['restaurant', 'User'],
    endpoints: (builder) => ({
        getAllRestaurant: builder.query({
            query: () => ({
                url: '/restaurant',
                credentials: 'include',
            }),
            providesTags: ['restaurant']
        }),
        getUserRestaurant: builder.query({
            query: () => ({
                url: "restaurant/admin",
                credentials: "include"
            }),
        }),
        DeleteUserResturant: builder.mutation({
            query: (restaurant_id) => ({
                url: `/restaurant/admin/${restaurant_id}`,
                method:"DELETE",
                credentials: "include",
            }),
            invalidatesTags: ['restaurant']
        }),
     
      
        })
       

})


export default api

export const { useGetAllRestaurantQuery, useGetUserRestaurantQuery,
    useLazyGetAllRestaurantQuery,useDeleteUserResturantMutation
} = api
