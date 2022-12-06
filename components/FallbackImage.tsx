import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ImageProps } from "next/image";
import SanClementeBeach from "../resources/San_Clemente_Beach.jpeg";

type Props = ImageProps & {
  src: string | undefined;
};

// need to create a full fallback image selection
const placeholderImageURL = SanClementeBeach;

function FallbackImage({ src, ...rest }: Props) {
  const [imgSrc, setImgSrc] = useState<StaticImageData | string>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc ? imgSrc : placeholderImageURL}
      onError={() => {
        setImgSrc(placeholderImageURL);
      }}
    />
  );
}

export default FallbackImage;
