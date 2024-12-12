import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Swiper1 from "@/components/ui/customCompount/Swiper";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
<>

<div className="w-full h-full flex border-l">
  <div className="w-1/5 max-md:hidden items-center justify-center flex flex-col">
    <h2 className="font-bold ">Filters</h2>
     <h3>Sort by</h3>
  </div>
  <div className="w-4/5 max-md:w-full pl-8 mt-1">
   <div className="m-2 items-center justify-center flex">
    <Input placeholder="Food" />
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
   <Swiper1  />
    </Card>
   </div>
   <div className="">
    <h2 className="font-bold text-3xl p-3 ">Delivery Fee Savers</h2>
    <Swiper1 />
   </div>

  </div>

</div>
</>
  );
}
