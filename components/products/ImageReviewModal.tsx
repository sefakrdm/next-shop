"use client";

import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Rating as ReactRating, RoundedStar } from '@smastrom/react-rating';
import "@smastrom/react-rating/style.css";
import moment from 'moment';
import "moment/locale/tr";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { CaretRight, CaretLeft, Circle  } from '@phosphor-icons/react/dist/ssr';
import ClientImageComponent from '../ClientImageComponent';
import { ProductTypes, ReviewTypes } from '@/utils/definitions';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { cn, firstLastLetter, firstLetter, priceFormat } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

// interface ReviewTypes {
//   product: ProductTypes;
//   images: string[];
//   user: {
//     name: string;
//     surname: string;
//   };
//   comment: string;
//   rate: number;
//   hiddenName: boolean;
//   createdAt: Date;
//   handleClose: () => void;
//   handleNextComment: () => void;
//   handlePreviousComment: () => void;
// }

interface ImageReviewModalProps {
    reviews: ReviewTypes[];
    product: ProductTypes;
}

const ImageReviewModal:React.FC<ImageReviewModalProps> = ({ reviews, product }) => {

  const [isPending, startTransition] = useTransition();
  const [api, setApi] = React.useState<CarouselApi>()

  const [selectReview, setSelectedReview] = useState<number>(0);
  const [selectReviewImage, setSelectedReviewImage] = useState<number>(0);

  const handlePreviousComment = () => {
    startTransition(() => {
      setSelectedReview((prev) => (prev > 0 ? prev - 1 : reviews.length - 1)); // Eğer 0'a gelindiyse son yoruma git
      setSelectedReviewImage(0);
    });
  };
  
  const handleNextComment = () => {
    startTransition(() => {
      setSelectedReview((prev) => (prev < reviews.length - 1 ? prev + 1 : 0)); // Eğer son yoruma gelindiyse başa dön
      setSelectedReviewImage(0);
    });
  };

  React.useEffect(() => {
    if (!api) {
      return
    }
 
    api.scrollTo(selectReviewImage);

  }, [api, selectReviewImage])

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center space-x-2.5 w-fit">
            {reviews.map((r, index) => (
              <div
                key={index}
                className="flex items-center space-x-2.5 w-fit cursor-pointer"
              >
                {r.images.map((image, ImageIndex) => (
                  <div
                    key={ImageIndex}
                    onClick={() => {
                      setSelectedReviewImage(ImageIndex);
                      setSelectedReview(index);
                    }}
                  >
                    <ClientImageComponent
                      src={image}
                      alt={""}
                      width={80}
                      height={80}
                      className="border rounded-md p-0.5 object-contain w-20 h-20"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </DialogTrigger>
        <DialogContent className={cn("max-w-4xl h-[600px] p-0 transition-all")}>
          <Button
            onClick={handlePreviousComment}
            size="icon"
            variant="secondary"
            className="inline-flex items-center justify-center whitespace-nowrap font-medium disabled:pointer-events-none absolute rounded-lg top-1/2 -translate-y-1/2 -left-24"
            disabled={isPending}
          >
            <CaretLeft size={18} weight="bold" />
          </Button>
          <Button
            onClick={handleNextComment}
            size="icon"
            variant="secondary"
            className="inline-flex items-center justify-center whitespace-nowrap font-medium disabled:pointer-events-none absolute rounded-lg top-1/2 -translate-y-1/2 -right-24"
            disabled={isPending}
          >
            <CaretRight size={18} weight="bold" />
          </Button>

          {isPending ? (
            <Skeleton className="h-[550px] max-w-4xl" />
          ) : (
            <div className={cn("flex justify-start w-full h-full")}>
              <div className="w-1/2 border-r h-auto flex items-center justify-center">
                <Carousel setApi={setApi} opts={{loop: true}}>
                  <CarouselContent>
                    {reviews[selectReview]?.images?.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="flex items-center justify-center h-full w-full">
                          <ClientImageComponent
                            src={image}
                            alt={""}
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
                        <div className="text-lg font-bold">
                          {reviews[selectReview]?.hiddenName
                            ? firstLastLetter(
                                `${reviews[selectReview]?.user.name} ${reviews[selectReview]?.user.surname}`
                              )
                            : `${
                                reviews[selectReview]?.user.name
                              } ${firstLetter(
                                reviews[selectReview]?.user.surname
                              )}`}
                        </div>
                        <Circle size={8} weight="duotone" />
                        <div className="text-sm font-semibold text-muted-foreground">
                          {moment(reviews[selectReview]?.createdAt).format(
                            "LL"
                          )}
                        </div>
                      </div>
                      <ReactRating
                        style={{ maxWidth: 100 }}
                        value={reviews[selectReview]?.rate}
                        itemStyles={{
                          itemShapes: RoundedStar,
                          activeFillColor: "#facc15",
                          inactiveFillColor: "#d8d8d8",
                        }}
                        transition="zoom"
                        readOnly
                      />
                      <div>{reviews[selectReview]?.comment}</div>
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
                          <div className="text-sm font-medium line-clamp-2">
                            {product.title} Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Impedit laudantium,
                            saepe a ea pariatur quis tenetur deleniti voluptates
                            numquam debitis ut voluptatum harum voluptatem ad
                            veniam omnis! Est, ipsum quos.
                          </div>
                          <div className="text-base font-bold text-primary">
                            {product?.prices &&
                              product?.prices[0].currency &&
                              priceFormat(
                                product?.prices[0].currency,
                                product?.prices[0].currency,
                                "tr-TR",
                                product?.prices[0].sellPrice || 0
                              )}
                          </div>
                        </div>
                      </div>
                      <Button className="w-full" size="sm">
                        Sepete Ekle
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ImageReviewModal