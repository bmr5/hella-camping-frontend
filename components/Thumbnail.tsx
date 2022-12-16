import React from "react";
import Link from "next/link";
import FallbackImage from "./FallbackImage";
import { nameWithNoSpaces } from "../hooks/nameTransformUtils";
import { StaticImageData } from "next/image";

interface Props {
  parkName: string;
  id: number;
  src: StaticImageData | string;
}

const Thumbnail = ({ parkName, id, src }: Props) => {
  const name = nameWithNoSpaces(parkName);

  return (
    <Link
      href={`/parks/${id}?name=${name}`}
      className=" transform cursor-pointer transition duration-200 ease-in hover:z-50 sm:hover:scale-105"
    >
      <FallbackImage
        alt={`photo of ${name}`}
        src={src}
        width={600}
        height={200}
        className="rounded-xl object-cover h-44"
        priority
      />
      <div className="absolute text-center  text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-bold text-xl">{name}</h1>
      </div>
    </Link>
  );
};

export default Thumbnail;
