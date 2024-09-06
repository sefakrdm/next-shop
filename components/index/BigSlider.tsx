import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import DynamicImage from "../DynamicImage";

const BigSlider: React.FC = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="relative">
          {/* <Image src="/images/slider-3.jpg" width={1520} height={500} alt="" className="object-cover rounded-xl" /> */}
          <DynamicImage
            url={`${process.env.NEXT_PUBLIC_URL}/images/slider-3.jpg`}
            alt={""}
            width={1520}
            height={500}
            className="object-cover rounded-xl"
            priority
          />
        </CarouselItem>
        <CarouselItem className="relative">
          {/* <Image src="/images/slider-4.jpg" width={1520} height={500} alt="" className="object-cover rounded-xl" /> */}
          <DynamicImage
            url={`${process.env.NEXT_PUBLIC_URL}/images/slider-4.jpg`}
            alt={""}
            width={1520}
            height={500}
            className="object-cover rounded-xl"
            priority
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default BigSlider;