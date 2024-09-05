import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Rating as ReactRating, RoundedStar } from '@smastrom/react-rating';
import moment from 'moment';
import "moment/locale/tr";
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Circle  } from '@phosphor-icons/react/dist/ssr';
import ClientImageComponent from '../ClientImageComponent';

interface ImageReviewModalProps {
    images: string[];
    userName: string;
    comment: string;
    rate: number;
    createdAt: Date;
    handleClose: () => void;
}

const ImageReviewModal:React.FC<ImageReviewModalProps> = ({ images, userName, comment, rate, createdAt, handleClose }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center space-x-2.5 w-fit cursor-pointer">
          {images.map((image, index) => (
            // <DynamicImage
            //   key={index}
            //   url={image}
            //   alt={userName}
            //   width={64}
            //   height={64}
            //   className="border rounded-md p-0.5 object-contain w-16 h-16"
            // />
            <ClientImageComponent
              src={image}
              alt={userName}
              width={64}
              height={64}
              className="border rounded-md p-0.5 object-contain w-16 h-16"
            />
          ))}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0">
        <div className="flex justify-start w-full h-full">
          <div className="w-1/2 border-r">
            <Carousel>
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="flex items-center justify-center h-full w-full">
                      <ClientImageComponent
                        src={image}
                        alt={userName}
                        width={400}
                        height={1000}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          <div className="w-1/2 p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-2 w-full">
                <div className="flex items-center space-x-2.5">
                  <div className="text-lg font-bold">{userName}</div>
                  <Circle size={8} weight="duotone" />
                  <div className="text-sm font-semibold text-muted-foreground">
                    {moment(createdAt).format("LL")}
                  </div>
                </div>
                <ReactRating
                  style={{ maxWidth: 100 }}
                  value={rate}
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: "#facc15",
                    inactiveFillColor: "#d8d8d8",
                  }}
                  transition="zoom"
                  readOnly
                />
                <div>{comment}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageReviewModal