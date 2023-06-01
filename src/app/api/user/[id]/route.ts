import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return NextResponse.json({ message: 'Hellodddd' });
}

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  return NextResponse.json({ body });
}
