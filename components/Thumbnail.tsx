import React from "react";
import Link from "next/link";
import { Park } from "../pages";
import FallbackImage from "./FallbackImage";

interface Props {
  park: Park;
}

const Thumbnail = ({ park }: Props) => {
  return (
    <Link
      href={`/parks/${park.id}`}
      className=" transform cursor-pointer transition duration-200 ease-in hover:z-50 sm:hover:scale-105"
    >
      <FallbackImage
        alt={`photo of ${park.name}`}
        src={park.imageUrl ?? ""}
        width={600}
        height={200}
        className="rounded-xl object-cover h-44"
        priority
      />
      <div className="absolute text-center  text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-bold text-xl">{park.name}</h1>
      </div>
    </Link>
  );
};

export default Thumbnail;
