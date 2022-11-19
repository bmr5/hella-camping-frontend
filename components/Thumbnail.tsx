import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  facilityImageUrl: string;
  facilitySlug: string;
  parkName: string | undefined;
  campgroundName: string;
}

const Thumbnail = ({
  facilityImageUrl,
  facilitySlug,
  parkName,
  campgroundName,
}: Props) => {
  return (
    <Link
      href={`/campgrounds/${facilitySlug}`}
      className=" transform cursor-pointer transition duration-200 ease-in hover:z-50 sm:hover:scale-105"
    >
      <Image
        alt={`photo of ${campgroundName}`}
        src={facilityImageUrl}
        width={600}
        height={200}
        className="rounded-xl object-cover h-44"
        priority
      />
      <div className="absolute bottom-5 left-5 text-white">
        <h1 className="font-bold text-2xl">{campgroundName}</h1>
        <h1 className="font-bold text-xl">{parkName}</h1>
      </div>
    </Link>
  );
};

export default Thumbnail;
