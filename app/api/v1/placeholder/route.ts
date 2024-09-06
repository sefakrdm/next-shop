import { getImage } from '@/lib/getImage';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (typeof url !== 'string') {
    return NextResponse.json({ error: 'Invalid query parameter' }, { status: 404 });
  }

  try {
    const { base64, img } = await getImage(url)
    return NextResponse.json({ base64, img }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate placeholder' }, { status: 404 });
  }
}