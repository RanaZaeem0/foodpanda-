
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Star } from 'lucide-react'
import React  from "react"
import { FaPersonWalking } from "react-icons/fa6";
import { BsSuitcase2 } from "react-icons/bs";
import { BsShop } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md"
import { LiaConciergeBellSolid } from "react-icons/lia"
import { Card, CardContent } from '@/components/ui/card'
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link';

export default function EventHeader(){
  const [isBeginning, setIsBeginning] = React.useState(true)
    const [isEnd, setIsEnd] = React.useState(false)

    return <div className="w-full">

      <div className="w-1/2">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        loop={false}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning)
          setIsEnd(swiper.isEnd)
        }}
      >
        
           <SwiperSlide key={1}>
            <Link href={'/delivery'} className="flex m-2 gap-2">
            <MdOutlineDeliveryDining className="h-6 w-6" />
            <h2 className="font-normal  items-center justify-center flex text-md">Delivery</h2>
              </Link>
          </SwiperSlide>
          <SwiperSlide key={3}>
          <Link href={"pickup"} className="flex m-2 gap-2">
            <FaPersonWalking className="h-6 w-6" />
            <h2 className="font-normal items-center justify-center flex text-md text-md">Pick up</h2>
          </Link>
          </SwiperSlide>
          <SwiperSlide key={2}>
          <Link href={"pandamart"} className="flex m-2 gap-2">
            <BsSuitcase2 className="h-6 w-6" />
            <h2 className="font-normal items-center justify-center flex text-md text-md">Pandamart</h2>
          </Link>
          </SwiperSlide>
          <SwiperSlide key={4}>
          <div className="flex m-2 gap-2">
            <LiaConciergeBellSolid className="h-6 w-6" />
            <h2 className="font-normal items-center justify-center flex text-md text-md">Caterers</h2>
          </div>
          </SwiperSlide>
      </Swiper>
      </div>
    </div>
}