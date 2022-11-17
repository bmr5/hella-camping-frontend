import React from "react";
import Image from "next/legacy/image";
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
      className="transform cursor-pointer transition duration-200 ease-in hover:z-50 sm:hover:scale-105 p-2"
    >
      <Image
        alt=""
        layout="responsive"
        src={facilityImageUrl}
        height={250}
        width={500}
        className="rounded-xl "
      />
      <div className="absolute bottom-5 left-5 text-white">
        <h1 className="font-bold text-2xl">{campgroundName}</h1>
        <h1 className="font-bold text-xl">{parkName}</h1>
      </div>
    </Link>
  );
};

export default Thumbnail;
