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
import SaltPointImage from "../../resources/Salt-Point/Salt_Point.jpeg";

type Props = {
  park: Park;
};

function ParkPage({ park }: Props) {
  const name = "Salt Point State Park";

  return (
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px]">
      <div className="relative w-full pb-10">
        <FallbackImage
          alt={`photo of ${name}`}
          src={SaltPointImage}
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
            Salt Point State Park is a stunning coastal destination located in
            the heart of California's Sonoma County. The park's rugged
            coastline, which stretches for over 20 miles, is home to a wide
            variety of plant and animal life, including redwood forests,
            meadows, and rocky cliffs.
          </p>
          <p className="pb-2">
            One of the park's most popular features is its tidepools, which are
            home to a variety of marine life, including crabs, starfish, and
            anemones. The park is also a popular destination for hikers, with
            over 20 miles of trails that range from easy to challenging, and
            there are also trails for biking and horseback riding.
          </p>
          <p className="pb-2">
            In addition to its natural beauty, Salt Point State Park is also
            home to a rich cultural and historical history. It was once home to
            the Pomo Native American tribe, and the park is home to several
            historic structures, including the historic Salt Point Lighthouse.
          </p>
          <p className="pb-2">
            Salt Point State Park is a stunning coastal destination located in
            the heart of California's Sonoma County. The park's rugged
            coastline, which stretches for over 20 miles, is home to a wide
            variety of plant and animal life, including redwood forests,
            meadows, and rocky cliffs. One of the park's most popular features
            is its tidepools, which are home to a variety of marine life,
            including crabs, starfish, and anemones. The park is also a popular
            destination for hikers, with over 20 miles of trails that range from
            easy to challenging, and there are also trails for biking and
            horseback riding. In addition to its natural beauty, Salt Point
            State Park is also home to a rich cultural and historical history.
            It was once home to the Pomo Native American tribe, and the park is
            home to several historic structures, including the historic Salt
            Point Lighthouse. Whether you are interested in nature, history, or
            simply enjoying the great outdoors, Salt Point State Park has
            something for everyone.
          </p>
          <h2 className="font-bold text-xl pb-2">Facilities</h2>
          <p className="pb-2">The facilities at {name} include:</p>
          <ul className="pb-2 list-disc list-inside">
            <li className="pb-2">
              Woodside Lower Loop: This campground is located in a wooded area
              of the park and is suitable for tents, trailers, and RVs. Each
              campsite has a picnic table and fire ring, and there are restrooms
              and showers nearby.
            </li>
            <li className="pb-2">
              Warren Group Camp Area: This group camping area is located in a
              wooded area of the park and is suitable for tents and trailers. It
              includes a large, sheltered picnic area with tables and barbecue
              grills, as well as access to nearby restrooms and showers. It is
              suitable for groups of up to 50 people.
            </li>
            <li className="pb-2">
              Woodside Upper Loop: This campground is also located in a wooded
              area of the park and is suitable for tents, trailers, and RVs.
              Each campsite has a picnic table and fire ring, and there are
              restrooms and showers nearby.
            </li>
            <li className="pb-2">
              Gerstle Cove Campground: This campground is located in a wooded
              area of the park near the coast and is suitable for tents,
              trailers, and RVs. Each campsite has a picnic table and fire ring,
              and there are restrooms and showers nearby.
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
  const parkId = 25;

  const { data } = await CLIENT.query({
    query: gql`
      query SaltPointParkQuery($where: PlaceWhereUniqueInput!) {
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
