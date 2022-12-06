import React, { useEffect, useState } from "react";
import { Park } from "../pages";
import Thumbnail from "./Thumbnail";
import useWindowDimensions from "../hooks/useWindowDimensions";

type Props = {
  parks: [Park];
};

function TopParks({ parks }: Props) {
  const [displayedParks, setDisplayedParks] = useState(4);
  const { width } = useWindowDimensions();

  useEffect(() => {
    switch (true) {
      case width >= 640 && width < 768:
        setDisplayedParks(4);
        break;
      case width >= 768 && width < 1280:
        setDisplayedParks(6);
        break;
      case width >= 1280:
        setDisplayedParks(9);
        break;
    }
  }, [width]);

  return (
    <div className="w-full flex flex-col pb-16">
      <h1 className="w-full font-bold text-2xl pb-4 ml-2">Top Parks</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 3xl:flex gap-5">
        {parks.map((park, i) => {
          if (i > displayedParks - 1) {
            return;
          }
          const parkName = park != null ? park.name : undefined;
          return <Thumbnail park={park} key={park.id} />;
        })}
      </div>
    </div>
  );
}

export default TopParks;
