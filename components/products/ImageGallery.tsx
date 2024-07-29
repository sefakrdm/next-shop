"use client"

import React, { useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ImageMagnifier from "./ImageMagnifier";

interface ImageGalleryProps {
    images: string[];
    className: string;
}

const ImageGallery:React.FC<ImageGalleryProps> = ({images, className}) => {

    const mainRef = useRef();
    const thumbsRef = useRef();

  const createSlider = () => {
    return images.map((slide, index) => (
      <SplideSlide key={index} className="h-full w-full">
        <ImageMagnifier imageUrl={slide} />
      </SplideSlide>
    ));
  };

  const mainOptions = {
    type: "loop",
    width: '100%',
    height: '75vh',
    pagination: false,
    arrows: false,
  };

  const thumbsOptions = {
    type: "slide",
    //rewind: true,
    gap: "1rem",
    pagination: false,
    fixedWidth: 70,
    fixedHeight: 70,
    height: '75vh',
    cover: true,
    //focus: "center",
    isNavigation: true,
    arrows: false,
    //releaseWheel: true,
    direction: 'ttb',
    releaseWheel: true,
  };

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, [mainRef, thumbsRef]);

  return (
    <div className={cn(className)}>
      <Splide options={thumbsOptions} ref={thumbsRef} className="p-0 pl-1">
        {images.map((slide, index) => (
          <SplideSlide
            key={index}
            className="rounded-md border border-gray-500"
          >
            <Image
              src={slide}
              alt=""
              width={70}
              height={70}
              className="object-contain z-10"
            ></Image>
          </SplideSlide>
        ))}
      </Splide>

      <Splide
        options={mainOptions}
        ref={mainRef}
        className="p-0 h-full w-full"
        aria-labelledby="thumbnail-slider-example"
      >
        {createSlider()}
      </Splide>
    </div>
  );
};

export default ImageGallery;
