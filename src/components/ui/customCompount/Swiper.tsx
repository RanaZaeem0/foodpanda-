'use client'

import * as React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Star } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import 'swiper/css'
import 'swiper/css/navigation'
import { useGetAllRestaurantQuery } from '@/lib/api/api'
import { ProductCardSkeleton } from './ProductSkeleton'



export default function Swiper1() {



  const [isBeginning, setIsBeginning] = React.useState(true)
  const [isEnd, setIsEnd] = React.useState(false)



const allResturentData = useGetAllRestaurantQuery({})
if(allResturentData.isLoading){
  return  <div className="max-w-5xl mx-auto p-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {/* Display multiple skeletons */}
    {[...Array(4)].map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
</div>
}


  return (
    <div className=" mx-auto relative pl-4">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        loop={false}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning)
          setIsEnd(swiper.isEnd)
        }}
      >
        {allResturentData?.data?.allResturant?.map((product:any, index:number) => {
            return <SwiperSlide key={index} >
              <Card>
                <div className=" w-full flex flex-col items-center justify-center">
                <div className="w-full ">
                <Image
                    src={product.image_url}
                    alt={product.food_items}
                    width={200}
                    height={200}
                    className="!w-full h-auto object-cover mb-4 rounded-md"
                  />
                </div>
                  <div className="flex items-start w-full p-2 justify-between">
                    <div className="w-3/4">
                    <h3 className="text-sm font-semibold font-sans truncate w-full">{product.name}</h3>

                      <h3 className="text-xs font-medium mb-2">$$ . Pakistani</h3>
                      <div className="flex gap-2 ">

                      </div>
                    </div>

                    <div className="flex items-center w-1/4">
                 
                      <span className="ml-2 text-sm text-gray-600">{4.5}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          })
        }
      </Swiper>
      <button
        className={`bg-white border swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10  rounded-full p-2 shadow-md ${isBeginning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
          }`}
        disabled={isBeginning}
      >
        <GrLinkPrevious className='' />
      </button>
      <button
        className={` swiper-button-next text-black absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md ${isEnd ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
          }`}
        disabled={isEnd}
      >
        <GrLinkNext className='' />
      </button>
    </div>
  )
}

