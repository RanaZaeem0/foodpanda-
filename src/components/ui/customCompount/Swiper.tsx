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
import { productsData } from '@/lib/sample'
import { LuBike } from "react-icons/lu";
import { IoTimeOutline } from "react-icons/io5";



export default function ProductCarousel() {
  const [isBeginning, setIsBeginning] = React.useState(true)
  const [isEnd, setIsEnd] = React.useState(false)

  return (
    <div className=" mx-auto relative">
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
        {productsData.map((product,index) => (
          <SwiperSlide key={index}>
            <Card>
              <CardContent className="p-4 ">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover mb-4 rounded-md"
                />
               <div className="flex items-start justify-between">
             <div className="">
             <h3 className="text-lg font-semibold font-sans mb-2">{product.name}</h3>
                <h3 className="text-xs font-medium mb-2">$ . {product.foodCatory}</h3>
                <div className="flex gap-2 ">
                <h3 className="text-xs font-medium mb-2 flex gap-1 items-center justify-between "><IoTimeOutline /> {product.deliveryTime}</h3>
                <h3 className="text-xs font-medium flex gap-1 items-center justify-between mb-2 text-pink-600"><LuBike /> Free</h3>

                </div>
             </div>

                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                 <>
                 </>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{product.starRate.toFixed(1)}</span>
                </div>
               </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`bg-white border swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10  rounded-full p-2 shadow-md ${
          isBeginning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
        }`}
        disabled={isBeginning}
      >
      <GrLinkPrevious className='' />
      </button>
      <button
        className={` swiper-button-next text-black absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md ${
          isEnd ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
        }`}
        disabled={isEnd}
      >
       <GrLinkNext className=''/>
      </button>
    </div>
  )
}
