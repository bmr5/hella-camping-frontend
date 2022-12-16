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
import SanClementeBeachImage from "../../resources/San-Clemente-Beach/San_Clemente_Beach.jpeg";

type Props = {
  park: Park;
};

function ParkPage({ park }: Props) {
  const name = "San Clemente State Beach";

  return (
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px]">
      <div className="relative w-full pb-10">
        <FallbackImage
          alt={`photo of ${name}`}
          src={SanClementeBeachImage}
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
            San Clemente State Beach is a popular and scenic destination located
            in the beautiful Southern California coastline. It is known for its
            excellent surf on the north end of the beach and its hiking trails
            on the bluffs, which offer breathtaking views of the Pacific Ocean.
          </p>
          <p className="pb-2">
            The beach itself is a mile long and is popular for body surfing,
            swimming, and skin diving. It is also home to a landscaped blufftop
            with picnic areas, providing the perfect spot for a scenic outdoor
            meal.
          </p>
          <p className="pb-2">
            San Clemente State Beach offers a variety of accommodation options,
            including campsites for tents and RVs. Each campsite includes
            parking for one car and a towed vehicle, with additional vehicles
            charged at $15 per day per vehicle. The beach also has several
            amenities, including restrooms, showers, and a snack bar.
          </p>
          <p className="pb-2">
            Whether you are interested in surfing, hiking, or just soaking up
            the sun and sand, San Clemente State Beach has something for
            everyone.
          </p>
          <h2 className="font-bold text-xl pb-2">Facilities</h2>
          <p className="pb-2">The facilities at {name} include:</p>
          <ul className="pb-2 list-disc list-inside">
            <li className="pb-2">
              Tent Campground West Section (sites 73-99): This section of the
              campground is suitable for tents and is located in a wooded area
              of the park. Each campsite has a picnic table and fire ring, and
              there are restrooms and showers nearby.
            </li>
            <li className="pb-2">
              Tent Campground East Section (sites 100-160): This section of the
              campground is also suitable for tents and is located in a wooded
              area of the park. Each campsite has a picnic table and fire ring,
              and there are restrooms and showers nearby.
            </li>
            <li className="pb-2">
              RV Campground (sites 1-72): This section of the campground is
              suitable for RVs and is located in a wooded area of the park. Each
              campsite has a picnic table and fire ring, and there are restrooms
              and showers nearby.
            </li>
            <li className="pb-2">
              Tent Group Camp: This group campsite is suitable for tents and is
              located in a wooded area of the park. It includes a large,
              sheltered picnic area with tables and barbecue grills, as well as
              access to nearby restrooms and showers. It is suitable for groups
              of up to 50 people.
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
  const parkId = 23;

  const { data } = await CLIENT.query({
    query: gql`
      query SanClementeBeachQuery($where: PlaceWhereUniqueInput!) {
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
