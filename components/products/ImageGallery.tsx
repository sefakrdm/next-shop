"use client";

import React, { useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ImageMagnifier from "./ImageMagnifier";
import { ProductImageTypes } from "@/utils/definitions";
import ClientImageComponent from "../ClientImageComponent";



interface ImageGalleryProps {
  images: ProductImageTypes[];
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className }) => {
  const mainRef = useRef<any>(null);
  const thumbsRef = useRef<any>(null);

  const createSlider = () => {
    return images.map((slide, index) => (
      <SplideSlide key={index} className="h-full w-full">
        <ImageMagnifier image={slide} />
      </SplideSlide>
    ));
  };

  const mainOptions = {
    type: "loop",
    width: "100%",
    height: "75vh",
    pagination: false,
    arrows: false,
  };

  const thumbsOptions = {
    type: "slide",
    gap: "1rem",
    pagination: false,
    fixedWidth: 70,
    fixedHeight: 70,
    height: "75vh",
    cover: true,
    isNavigation: true,
    arrows: false,
    direction: "ttb",
    releaseWheel: true,
  };

  useEffect(() => {
    if (mainRef.current && thumbsRef.current) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, [mainRef, thumbsRef]);

  return (
    <div className={cn(className)}>
      <Splide options={thumbsOptions} ref={thumbsRef} className="p-0 pl-1">
        {images.map((slide, index) => (
          <SplideSlide
            key={index}
          >
            <div className="rounded-md border border-gray-500 h-16 w-16 overflow-hidden">
              <ClientImageComponent
                src={slide.url}
                alt={slide.alt}
                fill
                className="object-contain z-10"
              />
            </div>
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