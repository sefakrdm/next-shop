import { getPlaceholderImage } from '@/utils/images';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const src = searchParams.get('src');

  if (typeof src !== 'string') {
    return NextResponse.json({ error: 'Invalid query parameter' }, { status: 404 });
  }

  try {
    const base64 = await getPlaceholderImage(src);
    return NextResponse.json({ base64 }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate placeholder' }, { status: 404 });
  }
}