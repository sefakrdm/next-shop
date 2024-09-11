"use server"
import { promises as fs } from 'fs';
import path from 'path';

import { getPlaiceholder } from 'plaiceholder'

export async function getImage(src: string) {
  const isExternal = src.startsWith('http://') || src.startsWith('https://');

  let buffer: Buffer;

  if (isExternal) {
    // Dış URL'den resim al
    const response = await fetch(src);
    buffer = Buffer.from(await response.arrayBuffer());
  } else {
    // Eğer src yerel bir dosya ise, dosya sisteminden oku
    const imagePath = path.join(process.cwd(), "public", src); // Yerel dosya yolunu oluştur
    buffer = await fs.readFile(imagePath);
  }

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 })

  return {
    ...plaiceholder,
    img: { src, height, width }
  }
}