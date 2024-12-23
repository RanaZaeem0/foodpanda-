import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { NEXT_AUTH } from '@/auth/auth';
import db from "@/db"
import { uploadToCloudinary } from '@/lib/cloud';
import { log } from 'console';
import { NextApiRequest } from 'next';


const requestBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  phone_number: z.string(),
  address: z.string(),
  delivery_provider: z.string(),
  tag: z.string(),
  address_line2: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  minimum_order_amount: z.number(),
  minimum_delivery_time: z.number(),
  original_delivery_fee: z.number(),
});

export async function POST(req: NextRequest) {
  let formData;

  // Handle JSON parsing errors
  try {
    formData = await req.formData();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }
  const data = {
    name: formData.get('name')?.toString() || '',
    description: formData.get('description')?.toString() || '',
    phone_number: formData.get('phone_number')?.toString() || '',
    address: formData.get('address')?.toString() || '',
    delivery_provider: formData.get('delivery_provider')?.toString() || '',
    tag: formData.get('tag')?.toString() || '',
    address_line2: formData.get('address_line2')?.toString() || '', // optional field
    latitude: parseFloat(formData.get('latitude')?.toString() || '0'), // convert to number
    longitude: parseFloat(formData.get('longitude')?.toString() || '0'), // convert to number
    minimum_order_amount: parseFloat(formData.get('minimum_order_amount')?.toString() || '0'), // convert to number
  minimum_delivery_time: parseFloat(formData.get('minimum_delivery_time')?.toString() || '0'), // convert to number
  original_delivery_fee: parseFloat(formData.get('original_delivery_fee')?.toString() || '0'), // convert to number
  };
  // Validate request body
  console.log(typeof( formData.get('original_delivery_fee')),"foraData");
  console.log(typeof( formData.get('minimum_delivery_time')),"foraData");

  console.log("Parsed Data:", data);
  
  const parseResult = requestBodySchema.safeParse(data);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.format() },
      { status: 401},
    );
  }


  const session = await getServerSession(NEXT_AUTH);
  if (!session || !session?.user) {
    return NextResponse.json({ message: "Unauthoriztede" }, { status: 401 });
  }
  const { name, description, phone_number, address, delivery_provider,
    address_line2,
    latitude,
    longitude,
    minimum_order_amount,
    minimum_delivery_time,
    original_delivery_fee,tag } = parseResult.data

    console.log(parseResult.success ,"?");
    const file = formData.get("image") as File;
  const fileBuffer = await file.arrayBuffer();

  const mimeType = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");

  // this will be used to upload the file
  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

  const imageUploaded: any = await uploadToCloudinary(fileUri, file.name);

console.log(parseResult.data,imageUploaded.result.url);
  if (!imageUploaded.result?.url) {
    return NextResponse.json({ message: "Image upload failed" }, { status: 400 });
  }

  const user_id = session.user?.user_id
  console.log("Parsed Data:", parseResult.data);
  console.log("Image URL:", imageUploaded.result?.url);
  console.log("User ID:", user_id);
  


  const createResturent = await db.restaurant.create({
    data: {
      name,
      description,
      user_id,
      phone_number,
      address,
      image_url: imageUploaded.result.url,
      delivery_provider,
      tag,
      rating:0,
      review_number: 0,
      address_line2,
      latitude,
      longitude,
      minimum_order_amount,
      minimum_delivery_time,
      original_delivery_fee,

    }
  })
  if (!createResturent) {
    return NextResponse.json({ message: "Unable create restaurant" }, { status: 402 })
  }

  return NextResponse.json(createResturent);
}










export async function GET(req: NextResponse) {

    const session = await getServerSession(NEXT_AUTH);
    if (!session || !session?.user ) {
      return NextResponse.json({ message: "Unauthoriztede" }, { status: 401 });
    }
    const user_id = session.user.user_id

    console.log(user_id);
    
    const userRestaurent = await db.restaurant.findMany({
      where: {
        user_id: user_id, // Match user_id
      },
    
    })
    if (!userRestaurent) {
      return NextResponse.json({ message: "Can't find resturent" }, { status: 401 });
    }
    return NextResponse.json({
      msg: "User Restaurent ",
      userRestaurent
    });
  
  }
  