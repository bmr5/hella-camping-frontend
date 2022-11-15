import React from "react";
import { Campground } from "../pages";
import Thumbnail from "./Thumbnail";

type Props = {
  campgrounds: [Campground];
};

function Campgrounds({ campgrounds }: Props) {
  console.log({ campgrounds });
  return (
    <div className="my-10 flex-wrap justify-center px-5 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex w-full">
      {campgrounds.map((campground, i) => {
        if (i > 8) {
          return;
        }
        return (
          <Thumbnail
            key={campground["place-id"]}
            campgroundImageUrl={"https://www.gstatic.com/webp/gallery/4.webp"}
          />
        );
      })}
    </div>
  );
}

export default Campgrounds;
