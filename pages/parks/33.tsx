import { GetStaticProps } from "next";
import React from "react";
import { Park } from "..";
import FallbackImage from "../../components/FallbackImage";
import Link from "next/link";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import MapTile from "../../components/MapTile";
import { X_API_KEY, CLIENT } from "../api/graphql/GraphqlConstants";
import { gql } from "@apollo/client";
import CreateAlertButton from "../../components/CreateAlertButton";
import BigBasinRedwoods from "../../resources/Big-Basin-Redwoods/Big_Basin_Redwoods.jpeg";

type Props = {
  park: Park;
};

function ParkPage({ park }: Props) {
  const name = "Big Basin Redwoods State Park";

  return (
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px]">
      <div className="relative w-full pb-10">
        <FallbackImage
          alt={`photo of ${name}`}
          src={BigBasinRedwoods}
          width={1000}
          height={400}
          className="rounded-xl object-cover h-52 w-full"
          priority
        />
        <h1 className="font-bold text-2xl absolute text-white  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {name}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-10 w-full">
        <section className="w-2/3">
          <h2 className="font-bold text-xl pb-2">Park Overview</h2>
          <p className="pb-2">
            Big Basin Redwoods State Park is the oldest state park in
            California, having been acquired in 1902. It is a vast and diverse
            park that covers over 18,000 acres and is home to a wide variety of
            plant and animal life.
          </p>
          <p className="pb-2">
            The park features miles of trails that are suitable for hikers and
            equestrians, and the Skyline to the Sea Trail runs through the park,
            linking it to Castle Rock State Park and the eastern Santa Cruz
            range. The park also has a number of waterfalls, as well as a wide
            range of environments, including lush canyon bottoms,
            chaparral-covered slopes, and stately redwood groves.
          </p>
          <p className="pb-2">
            In addition to its stunning natural beauty, Big Basin Redwoods State
            Park is home to many animals, including deer, raccoons, and bobcats.
            The park is also a haven for birdwatchers, with a wide variety of
            bird species, including Steller's jays, egrets, herons, and
            California woodpeckers.
          </p>
          <p className="pb-2">
            Whether you are interested in hiking, birdwatching, or simply
            soaking up the beauty of the redwood forest, Big Basin Redwoods
            State Park has something for everyone.
          </p>
          <h2 className="font-bold text-xl pb-2">Facilities</h2>
          <p className="pb-2">The facilities at {name} include:</p>
          <ul className="pb-2 list-disc list-inside">
            <li className="pb-2">
              Sequoia Group 1 & 2: These group campsites are suitable for groups
              of up to 25 people and include a large, sheltered picnic area with
              tables and barbecue grills, as well as access to nearby restrooms
              and drinking water.
            </li>
            <li className="pb-2">
              Huckleberry Campground (sites 42-75): This campground is located
              in a wooded area of the park and is suitable for tents or small
              RVs. Each campsite has a picnic table, fire ring, and access to
              nearby restrooms and drinking water.
            </li>
            <li className="pb-2">
              Upper Blooms Creek (sites 139-156): This campground is located in
              a scenic, wooded area of the park and is suitable for tents or
              small RVs. Each campsite has a picnic table, fire ring, and access
              to nearby restrooms and drinking water.
            </li>
            <li className="pb-2">
              Wastahi Campground (sites 76-102): This campground is located in a
              wooded area of the park and is suitable for tents or small RVs.
              Each campsite has a picnic table, fire ring, and access to nearby
              restrooms and drinking water.
            </li>
            <li className="pb-2">
              Lower Blooms Creek (sites 103-138): This campground is located in
              a wooded area of the park and is suitable for tents or small RVs.
              Each campsite has a picnic table, fire ring, and access to nearby
              restrooms and drinking water.
            </li>
            <li className="pb-2">
              Sky Meadow Group 1 & 2: These group campsites are suitable for
              groups of up to 25 people and include a large, sheltered picnic
              area with tables and barbecue grills, as well as access to nearby
              restrooms and drinking water.
            </li>
            <li className="pb-2">
              Sempervirens Campground (sites 157-188): This campground is
              located in a wooded area of the park and is suitable for tents or
              small RVs. Each campsite has a picnic table, fire ring, and access
              to nearby restrooms and drinking water.
            </li>
          </ul>
        </section>

        <section className="w-1/2 md:w-1/3 flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center bg-white border rounded-lg p-5 gap-5">
            {park.id && <CreateAlertButton park={park} />}
            <Link
              className="w-full h-20 bg-slate-400 flex items-center justify-center border rounded-lg text-white text-xl font-bold shadow-md transition duration-300 hover:bg-slate-500"
              href={""}
            >
              View on Gov Site
            </Link>
          </div>
          <div className="">
            <MapTile
              parkLocation={{
                longitude: park.longitude,
                latitude: park.latitude,
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ParkPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const parkId = 33;

  const { data } = await CLIENT.query({
    query: gql`
      query BigBasinRedwoodsParkQuery($where: PlaceWhereUniqueInput!) {
        getPlace(where: $where) {
          id
          highlights
          description
          imageUrl
          latitude
          longitude
          name
          facilities {
            name
            id
          }
        }
      }
    `,
    variables: {
      where: {
        id: parkId,
      },
    },
    context: { headers: { "x-api-key": X_API_KEY } },
  });

  return {
    props: {
      park: data.getPlace,
    },
  };
};
