"use client";

import React, { useState } from "react";
import { Rating as ReactRating, RoundedStar } from "@smastrom/react-rating";
import { Progress } from "../ui/progress";
import "@smastrom/react-rating/style.css";
import { Separator } from "../ui/separator";
import moment from "moment";
import "moment/locale/tr";
import { Button } from "../ui/button";
import { cn, firstLastLetter, firstLetter } from "@/lib/utils";
import { ProductTypes, ReviewTypes } from "@/utils/definitions";
import Image from "next/image";
import ImageReviewModal from "./ImageReviewModal";
import ClientImageComponent from "../ClientImageComponent";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { empty } from "@prisma/client/runtime/library";

interface ReviewsProps {
  reviews: ReviewTypes[];
  product: ProductTypes;
}

export const ProductReviews: React.FC<ReviewsProps> = ({
  reviews,
  product,
}) => {
  const [filterReview, setFilterReview] = useState<string[]>();

  const totalReviews = reviews.length;
  const getReviewCount = (rate: number) =>
    reviews.filter((r) => r.rate === rate).length;
  const getReviewPercentage = (rate: number) =>
    totalReviews > 0 ? (getReviewCount(rate) / totalReviews) * 100 : 0;

  // Ortalama puanı hesapla
  const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0);
  const averageRating =
    totalReviews > 0 ? (totalRating / totalReviews).toFixed(2) : "0.00";

  // Filtrelenen yorumları hesapla
  const filteredReviews =
    filterReview && filterReview.length > 0
      ? reviews.filter((r) => filterReview.includes(String(r.rate)))
      : reviews;

  const filterImageReviews = filteredReviews.filter(
    (r) => r.images && r.images.length > 0
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-10 p-5">
        <div className="flex flex-col items-center justify-center space-y-1">
          <div className="text-4xl font-extrabold">{averageRating}</div>
          <ReactRating
            style={{ maxWidth: 190 }}
            value={parseFloat(averageRating)}
            itemStyles={{
              itemShapes: RoundedStar,
              activeFillColor: "#facc15",
              inactiveFillColor: "#d8d8d8",
            }}
            transition="zoom"
            readOnly
          />
          <div className="font-semibold uppercase tracking-[.05em]">
            {totalReviews} değerlendirme
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1 w-full">
          {[5, 4, 3, 2, 1].map((rate) => (
            <div key={rate} className="flex items-center space-x-2 w-full">
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
              <Progress
                value={getReviewPercentage(rate)}
                className="w-[50%] bg-slate-200 rounded-md"
              />
              <div className="text-xs font-semibold">
                ({getReviewCount(rate)})
              </div>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between gap-10 my-5">
        <div className="text-xl font-semibold">Yorumlar</div>
        <div className="flex items-center space-x-2">
          <span>Yorumları filtrele:</span>
          {/* <Button
            variant="outline"
            size="sm"
            className={cn(
              "text-xs font-semibold",
              filterReview === null && "border-primary bg-primary/5"
            )}
            onClick={() => setFilterReview(null)}
          >
            Tümü
            <span className="text-xs font-semibold ml-1">({totalReviews})</span>
          </Button>
          {[5, 4, 3, 2, 1].map((rate) => (
            <Button
              key={rate}
              variant="outline"
              size="sm"
              className={cn(
                filterReview === rate && "border-primary bg-primary/5"
              )}
              onClick={() => setFilterReview(rate)}
            >
              <ReactRating
                style={{ maxWidth: 70 }}
                value={rate}
                itemStyles={{
                  itemShapes: RoundedStar,
                  activeFillColor: "#facc15",
                  inactiveFillColor: "#d8d8d8",
                }}
                transition="zoom"
                readOnly
              />
              <span className="text-xs font-semibold ml-1">
                ({getReviewCount(rate)})
              </span>
            </Button>
          ))} */}

          <ToggleGroup
            type="multiple"
            variant="outline"
            className="text-xs font-semibold"
            size="sm"
            onValueChange={setFilterReview}
            value={filterReview}
          >
            {[5, 4, 3, 2, 1].map((rate) => (
              <ToggleGroupItem
                value={rate.toString()}
                className={cn(
                  "text-xs font-semibold",
                  filterReview?.some((fr) => Number(fr) === rate) && "border-primary bg-primary/5"
                )}
              >
                <ReactRating
                  style={{ maxWidth: 70 }}
                  value={rate}
                  itemStyles={{
                    itemShapes: RoundedStar,
                    activeFillColor: "#facc15",
                    inactiveFillColor: "#d8d8d8",
                  }}
                  transition="zoom"
                  readOnly
                />
                <span className="text-xs font-semibold ml-1">
                  ({getReviewCount(rate)})
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <div className="space-y-5">
        {filterImageReviews && filteredReviews.length > 0 && (
          <>
            <span className="text-sm font-medium text-muted-foreground">
              Fotoğraflı değerlendirmeler:
            </span>
            <div className="flex items-center justify-start space-x-2">
              <ImageReviewModal
                reviews={filterImageReviews}
                product={product}
              />
            </div>
          </>
        )}
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div
              key={index}
              className="block rounded-xl p-5 bg-white border space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ReactRating
                    style={{ maxWidth: 100 }}
                    value={review.rate}
                    itemStyles={{
                      itemShapes: RoundedStar,
                      activeFillColor: "#facc15",
                      inactiveFillColor: "#d8d8d8",
                    }}
                    transition="zoom"
                    readOnly
                  />
                  <div className="text-sm font-medium">
                    {review.hiddenName
                      ? firstLastLetter(
                          `${review.user.name} ${review.user.surname}`
                        )
                      : `${review.user.name} ${firstLetter(
                          review.user.surname
                        )}`}
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {moment(review.createdAt).format("LL")}
                </div>
              </div>
              <div>{review.comment}</div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">Hiç yorum yok</div>
        )}
      </div>
    </div>
  );
};
