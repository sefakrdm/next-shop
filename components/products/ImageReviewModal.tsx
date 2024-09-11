import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Rating as ReactRating, RoundedStar } from '@smastrom/react-rating';
import moment from 'moment';
import "moment/locale/tr";
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Circle  } from '@phosphor-icons/react/dist/ssr';
import ClientImageComponent from '../ClientImageComponent';
import { ProductTypes } from '@/utils/definitions';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { priceFormat } from '@/lib/utils';

interface ImageReviewModalProps {
    product: ProductTypes;
    images: string[];
    userName: string;
    comment: string;
    rate: number;
    createdAt: Date;
    handleClose: () => void;
}

const ImageReviewModal:React.FC<ImageReviewModalProps> = ({ product, images, userName, comment, rate, createdAt, handleClose }) => {
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
              key={index}
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
            <div className="flex flex-col h-full items-stretch justify-between">
              <div className="flex items-start justify-between h-full">
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
              <Separator className="my-5" />
              {product && (
                <div className="space-y-2.5">
                  <div className="flex items-stretch h-auto space-x-5">
                    <ClientImageComponent
                      src={product.ProductImages[0].url}
                      alt={product.ProductImages[0].alt}
                      width={80}
                      height={80}
                      className="flex-none border rounded-md p-0.5 object-contain w-20 h-20"
                    />
                    <div className="flex flex-col justify-around">
                      <div className="text-sm font-medium line-clamp-2">{product.title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit laudantium, saepe a ea pariatur quis tenetur deleniti voluptates numquam debitis ut voluptatum harum voluptatem ad veniam omnis! Est, ipsum quos.</div>
                      <div className="text-base font-bold text-primary">
                        {product?.price?.currency &&
                          product?.price &&
                          priceFormat(
                            product?.price?.currency,
                            product?.price?.currency,
                            "tr-TR",
                            product?.price?.sellPrice || 0
                          )}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">Sepete Ekle</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ImageReviewModal