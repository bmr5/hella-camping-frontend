import React from "react";
import { Facility, Park } from "../pages";
import Thumbnail from "./Thumbnail";

type Props = {
  facilities: [Facility];
  parks: [Park];
};

function Facilities({ facilities, parks }: Props) {
  return (
    <div className="w-full flex flex-col pb-8">
      <h1 className="w-full font-bold text-2xl pb-4 ml-2">Top Campgrounds</h1>
      <div className="sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex gap-5">
        {facilities.map((facility, i) => {
          if (i > 8) {
            return;
          }
          const park = parks.find(
            (park) => park["place-id"] === facility["origin-place-id"]
          );
          const parkName = park != null ? park.name : undefined;
          return (
            <Thumbnail
              facilitySlug={facility.slug}
              key={facility.slug}
              parkName={parkName}
              campgroundName={facility.name}
              facilityImageUrl={"https://www.gstatic.com/webp/gallery/4.webp"}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Facilities;
