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
import AngelIslandImage from "../../resources/Angel-Island/angel_island.jpeg";

type Props = {
  park: Park;
};

function ParkPage({ park }: Props) {
  const name = "Angel Island State Park";

  return (
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px] flex flex-col items-center">
      <div className=" max-w-7xl">
        {" "}
        <div className="relative w-full pb-10">
          <FallbackImage
            alt={`photo of ${name}`}
            src={AngelIslandImage}
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
              Angel Island State Park is a unique and historic destination
              located in the midst of San Francisco Bay. The park offers
              breathtaking views of the city skyline, the Marin Headlands, and
              Mount Tamalpais. In addition to its natural beauty, the island has
              a rich history that spans thousands of years.
            </p>
            <p className="pb-2">
              The island was originally inhabited by the Coastal Miwok Indians,
              who used it as a fishing and hunting site. Later, the island was
              discovered by Spanish explorer Juan de Ayala and became a popular
              stop for sailors. It was also used as a cattle ranch and later
              became a U.S. Army post.
            </p>
            <p className="pb-2">
              From 1910 to 1940, the island was used as an immigration
              processing center, where thousands of immigrants were processed
              before entering the United States. During World War II, the island
              was used to detain Japanese and German prisoners of war, and it
              also served as a jumping-off point for American soldiers returning
              from the Pacific.
            </p>
            <p className="pb-2">
              In the 1950s and 60s, the island was home to a Nike missile base.
              Today, there are two active Coast Guard stations on the island at
              Point Blunt and Point Stuart. Angel Island State Park was
              established in 1958 and is now a popular destination for tourists
              and locals alike, offering a variety of outdoor activities and a
              chance to learn about the island's rich history.
            </p>
            <h2 className="font-bold text-xl pb-2">Facilities</h2>
            <p className="pb-2">The facilities at {name} include:</p>
            <ul className="pb-2 list-disc list-inside">
              <li className="pb-2">
                Ayala Cove Group Picnic Area: This area offers a large,
                sheltered picnic area with tables and barbecue grills, as well
                as a small beach for swimming and water activities. It is
                suitable for groups of up to 50 people.
              </li>
              <li className="pb-2">
                Ridge (sites 4-6): These campsites are located on a ridge
                overlooking Ayala Cove and offer stunning views of the San
                Francisco Bay. Each site has a picnic table, fire ring, and
                access to nearby restrooms and drinking water.
              </li>
              <li className="pb-2">
                North Garrison Group Camp: This group camp is located in a
                secluded area of the park and is suitable for groups of up to 50
                people. It includes a large, sheltered picnic area with tables
                and barbecue grills, as well as access to restrooms and drinking
                water.
              </li>
              <li className="pb-2">
                West Garrison (sites 10 & Kayak): These campsites are located in
                the West Garrison area of the park and are suitable for tents or
                small RVs. Each site has a picnic table, fire ring, and access
                to nearby restrooms and drinking water. The Kayak site is
                specifically designed for campers who are arriving by kayak and
                includes a small boat launch.
              </li>
              <li className="pb-2">
                Sunrise (sites 7-9): These campsites are located in a sunny,
                open area of the park and offer excellent views of the
                surrounding area. Each site has a picnic table, fire ring, and
                access to nearby restrooms and drinking water.
              </li>
              <li className="pb-2">
                East Bay (sites 1-3): These campsites are located in a secluded,
                wooded area of the park and offer a peaceful and private camping
                experience. Each site has a picnic table, fire ring, and access
                to nearby restrooms and drinking water.
              </li>
              <li className="pb-2">
                East Group Garrison Picnic Area: This large, sheltered picnic
                area is suitable for groups of up to 50 people and includes
                tables and barbecue grills, as well as access to nearby
                restrooms and drinking water.
              </li>
            </ul>
          </section>

          <section className="w-1/2 md:w-1/3 flex flex-col gap-4">
            <div className="flex flex-col text-center items-center justify-center bg-white border rounded-lg p-5 gap-5">
              {park.id && <CreateAlertButton park={park} />}
              <Link
                className="w-full h-20 text-center bg-slate-400 flex items-center justify-center border rounded-lg text-white text-xl font-bold shadow-md transition duration-300 hover:bg-slate-500"
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
  const parkId = 13;

  const { data } = await CLIENT.query({
    query: gql`
      query AngelIslandParkQuery($where: PlaceWhereUniqueInput!) {
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
