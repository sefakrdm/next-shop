"use client"

import React, { useState } from 'react';
import Image from 'next/image';

const MAGNIFIER_SIZE = 140;
const ZOOM_LEVEL = 1.5;

const ImageMagnifier: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {

    // const [position, setPosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });
    // const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
    // const [cursorPosition, setCursorPosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });


    // const handleMouseHover = (e: React.MouseEvent) => {
    //   if(e.currentTarget) {
    //     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    //     const x = ((e.pageX - left - window.scrollX) / width) * 100;
    //     const y = ((e.pageX - top - window.scrollX) / height) * 100;
    //     let cursorX = e.pageX - left - window.scrollX;
    //     let cursorY = e.pageY - top - window.scrollY;
    //     setPosition({ x, y });

    //     setCursorPosition({ x: cursorX, y: cursorY })
    //   }
    // }


    const [zoomable, setZoomable] = useState(false);
    const [imageSize, setImageSize] = useState({
      width: 0,
      height: 0
    });
    const [position, setPosition] = useState({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
    
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      let { width, height } = e.currentTarget.getBoundingClientRect()
      setImageSize({ width, height });
      setZoomable(true);
      updatePosition(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setZoomable(false);
      updatePosition(e);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      updatePosition(e);
    }

    const updatePosition = (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      let x = e.clientX - left;
      let y = e.clientY - top;

      setPosition({
        x: -x * ZOOM_LEVEL + (MAGNIFIER_SIZE / 2),
        y: -y * ZOOM_LEVEL + (MAGNIFIER_SIZE / 2),
        mouseX: x - (MAGNIFIER_SIZE / 2),
        mouseY: y - (MAGNIFIER_SIZE / 2),
      });
    }

  return (
    <div className="relative h-full w-full flex justify-center items-center p-5">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="w-full h-full relative overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-contain z-10"
          style={{}}
        ></Image>

        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${
              imageSize.height * ZOOM_LEVEL
            }px`,
            backgroundRepeat: "no-repeat",
            display: zoomable ? "block" : "none",
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${MAGNIFIER_SIZE}px`,
            height: `${MAGNIFIER_SIZE}px`,
          }}
          className={`z-50 border-2 rounded-lg pointer-events-none absolute border-gray-500 bg-white`}
        />
      </div>
    </div>
  );
}

export default ImageMagnifier