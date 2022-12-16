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
import MacKerricherImage from "../../resources/MacKerricher/MacKerricher.jpeg";

type Props = {
  park: Park;
};

function ParkPage({ park }: Props) {
  const name = "MacKerricher State Park";

  return (
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px] flex flex-col items-center">
      <div className=" max-w-7xl">
        <div className="relative w-full pb-10">
          <FallbackImage
            alt={`photo of ${name}`}
            src={MacKerricherImage}
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
              MacKerricher State Park is a diverse and beautiful destination
              located along California's stunning Mendocino Coast. It is known
              for its rich array of habitats, including beach, bluff, headland,
              dune, forest, and wetland, all of which offer a wide variety of
              recreational opportunities.
            </p>
            <p className="pb-2">
              One of the park's most popular features is its tidepools, which
              are home to a variety of marine life, including seals that can be
              spotted on the rocks off the coast. The park is also a popular
              destination for birdwatchers, with more than 90 species of birds
              visiting or living near Cleone Lake, a formal tidal lagoon.
            </p>
            <p className="pb-2">
              In addition to its natural beauty, MacKerricher State Park is also
              a popular destination for outdoor enthusiasts. It offers miles of
              trails for hiking, jogging, and biking, as well as horseback
              riding trails for equestrians. Fishing is also popular in the
              park, with two fresh-water lakes stocked with trout.
            </p>
            <p className="pb-2">
              The park is wheelchair accessible and has a nature trail that is
              suitable for visitors with disabilities. Whether you are
              interested in nature, birdwatching, or simply enjoying the great
              outdoors, MacKerricher State Park has something for everyone.
            </p>
            <h2 className="font-bold text-xl pb-2">Facilities</h2>
            <p className="pb-2">The facilities at {name} include:</p>
            <ul className="pb-2 list-disc list-inside">
              <li className="pb-2">
                Cleone Group Area: This group camping area is located in a
                wooded area of the park and is suitable for tents and trailers.
                It includes a large, sheltered picnic area with tables and
                barbecue grills, as well as access to nearby restrooms and
                showers. It is suitable for groups of up to 50 people.
              </li>
              <li className="pb-2">
                West Pinewood Campground: This campground is located in a wooded
                area of the park and is suitable for tents, trailers, and RVs.
                Each campsite has a picnic table and fire ring, and there are
                restrooms and showers nearby.
              </li>
              <li className="pb-2">
                East Pinewood Campground: This campground is also located in a
                wooded area of the park and is suitable for tents, trailers, and
                RVs. Each campsite has a picnic table and fire ring, and there
                are restrooms and showers nearby.
              </li>
              <li className="pb-2">
                Surfwood Campground: This campground is located in a wooded area
                of the park and is suitable for tents, trailers, and RVs. Each
                campsite has a picnic table and fire ring, and there are
                restrooms and showers nearby.
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
  const parkId = 9;

  const { data } = await CLIENT.query({
    query: gql`
      query MacKerricherParkQuery($where: PlaceWhereUniqueInput!) {
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
