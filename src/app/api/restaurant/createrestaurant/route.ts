import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { NEXT_AUTH } from '@/auth/auth';
import prisma from '@/db/index';
import { MdPrecisionManufacturing } from 'react-icons/md';

const requestBodySchema = z.object({
  contentId: z.number(),
  duration: z.number(),
});

export async function POST(req: NextRequest) {
  const parseResult = requestBodySchema.safeParse(await req.json());

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }
  const session = await getServerSession(NEXT_AUTH);
  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }
  const createResturent  = await prisma
  

  return NextResponse.json(createResturent);
}