import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Image from 'next/image';

const BigSlider:React.FC = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="relative">
            <Image src="/images/slider-3.jpg" width={1520} height={500} alt="" className="object-cover rounded-xl" />
        </CarouselItem>
        <CarouselItem className="relative">
            <Image src="/images/slider-4.jpg" width={1520} height={500} alt="" className="object-cover rounded-xl" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default BigSlider