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
import PrarieCreekRedwoodsImage from "../../resources/Prarie-Creek-Redwoods/Prarie_Creek_Redwoods.webp";

type Props = {
  park: Park;
};

function ParkPage({ park }: Props) {
  const name = "Prarie Creek Redwoods State Park";

  return (
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px] flex flex-col items-center">
      <div className=" max-w-7xl">
        {" "}
        <div className="relative w-full pb-10">
          <FallbackImage
            alt={`photo of ${name}`}
            src={PrarieCreekRedwoodsImage}
            width={1000}
            height={400}
            className="rounded-xl object-cover h-52 w-full"
            priority
          />
          <h1 className="font-bold text-2xl absolute text-white  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {name}
          </h1>
        </div>
        <div className="flex flex-row gap-10 w-full">
          <section className="w-2/3">
            <h2 className="font-bold text-xl pb-2">Park Overview</h2>
            <p className="pb-2">
              Prairie Creek Redwoods State Park is a beautiful wilderness
              destination located in the heart of California's majestic Redwood
              Coast. The park is home to over 14,000 acres of old-growth redwood
              forest, which provides a stunning backdrop for a wide variety of
              recreational activities.
            </p>
            <p className="pb-2">
              One of the park's most popular features is its network of trails,
              which offer hikers the chance to explore the park's beautiful
              redwood forests and coastal bluffs. The park is also home to
              several beautiful beaches, including Gold Bluffs Beach, which is
              known for its stunning sunsets and is a popular spot for whale
              watching.
            </p>
            <p className="pb-2">
              In addition to its natural beauty, Prairie Creek Redwoods State
              Park is also home to a rich cultural and historical history. It
              was once home to the Yurok Native American tribe, and the park is
              home to several historic structures, including the historic Fern
              Canyon Trail.
            </p>
            <p className="pb-2">
              Whether you are interested in nature, history, or simply enjoying
              the great outdoors, Prairie Creek Redwoods State Park has
              something for everyone.
            </p>
            <h2 className="font-bold text-xl pb-2">Facilities</h2>
            <p className="pb-2">The facilities at {name} include:</p>
            <ul className="pb-2 list-disc list-inside">
              <li className="pb-2">
                Elk Prairie Campground: This campground is located in a wooded
                area of the park and is suitable for tents, trailers, and RVs.
                Each campsite has a picnic table and fire ring, and there are
                restrooms and showers nearby. This campground is open
                year-round.
              </li>
              <li className="pb-2">
                Meadow Cabin Colony: This cabin colony is located in a wooded
                area of the park and is suitable for tents and trailers. It
                includes a large, sheltered picnic area with tables and barbecue
                grills, as well as access to nearby restrooms and showers. This
                area is suitable for groups of up to 50 people. The cabins are
                rustic, with no electricity or running water. They include a
                wood stove, bunk beds, and a table and benches.
              </li>
            </ul>
          </section>

          <section className="w-1/2 md:w-1/3 flex flex-col gap-4">
            <div className="flex flex-col text-center items-center justify-center bg-white border rounded-lg p-5 gap-5">
              {park.id && <CreateAlertButton park={park} />}
              <Link
                className="w-full h-20 bg-slate-400 text-center flex items-center justify-center border rounded-lg text-white text-xl font-bold shadow-md transition duration-300 hover:bg-slate-500"
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
    </div>
  );
}

export default ParkPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const parkId = 49;

  const { data } = await CLIENT.query({
    query: gql`
      query PrarieCreekRedwoodsParkQuery($where: PlaceWhereUniqueInput!) {
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
