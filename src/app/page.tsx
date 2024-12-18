import { Card } from "@/components/ui/card";
import FilterSidebar from "@/components/ui/customCompount/FilderSidebar";
import FoodInput from "@/components/ui/customCompount/FoodInput";
import Swiper1 from "@/components/ui/customCompount/Swiper";
import { Input } from "@/components/ui/input";
import { getUserLocation } from "@/lib/lib";

import Image from "next/image";

export default function Home() {



  return (
<>

<div className="min-h-screen  bg-background text-foreground">
  
   <FilterSidebar />
<div className="flex items-end justify-end w-full ">
<div className="w-3/4 max-md:w-full">
   <div className="m-2 items-center justify-center flex">
    <FoodInput />
   </div> 
   <div className="">
    <Card className="card h-96 border-none shadow-none bg-pink-300 w-[98%]">
    <div className="pl-2 flex items-center gap-2 justify-start " style={{
      background:"url('https://images.deliveryhero.io/image/foodpanda/joker/fp/joker-sds-rlp-background-fp.webp')"
    }} >
      <Image src="https://images.deliveryhero.io/image/foodpanda/joker/fp/joker-sds-banner-rlp-fp.webp" alt="log" width={90} height={40}/>
      <div className="flex flex-col"
      >
        <h1 className="font-bold ">Get 25% off</h1>
        <p className="font-light">Min. order Rs. 415 </p>
      </div>
    </div>
   {/* <Swiper1 /> */}
    </Card>
   </div>
 


 
   <div className="">
    <h2 className="font-bold text-3xl p-3 ">Delivery Fee Savers</h2>
    {/* <Swiper1  /> */}
   </div>

  </div>
</div>

</div>
</>
  );
}
