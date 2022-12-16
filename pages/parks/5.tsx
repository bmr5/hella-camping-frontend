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
import ClearLakeImage from "../../resources/Clear-Lake/Clear_Lake.jpeg";

type Props = {
  park: Park;
};

function ParkPage({ park }: Props) {
  const name = "Clear Lake State Park";

  return (
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px] flex flex-col items-center">
      <div className=" max-w-7xl">
        <div className="relative w-full pb-10">
          <FallbackImage
            alt={`photo of ${name}`}
            src={ClearLakeImage}
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
              Clear Lake State Park is a beautiful and serene destination
              located in the heart of California's Clear Lake region. The park
              is home to a variety of outdoor activities, including hiking,
              biking, fishing, and boating. Visitors can take in stunning views
              of Clear Lake, which is the largest natural freshwater lake in
              California, from the park's many overlooks and trails.
            </p>
            <p className="pb-2">
              The park is also home to a diverse array of plant and animal life,
              including oak woodlands, meadows, and wetlands. Visitors may spot
              a variety of bird species, including herons, egrets, and ospreys,
              as well as mammals like mule deer and coyotes.
            </p>
            <p className="pb-2">
              Clear Lake State Park offers a range of amenities for visitors,
              including picnic areas, campsites, and a visitor center with
              educational exhibits about the park's history and natural
              environment. Whether you're looking for a peaceful retreat or an
              adventure-filled day in nature, Clear Lake State Park has
              something to offer for everyone.
            </p>
            <h2 className="font-bold text-xl pb-2">Facilities</h2>
            <p className="pb-2">The facilities at {name} include:</p>
            <ul className="pb-2 list-disc list-inside">
              <li className="pb-2">
                Cole Creek Campground: The Cole Creek Campground offers 26 sites
                nestled among oak trees and meadows. Each campsite is equipped
                with a picnic table, fire ring, and a grill. The campground also
                has restrooms with flush toilets and hot showers, as well as a
                dump station.
              </li>
              <li className="pb-2">
                Kelsey Creek Campground: The Kelsey Creek Campground has 91
                campsites with beautiful views of Clear Lake. The campsites are
                equipped with a picnic table, fire ring, and a grill, and the
                campground has restrooms with flush toilets and hot showers.
              </li>
              <li className="pb-2">
                Group Camping Area: The Group Camping Area at Clear Lake State
                Park offers a more secluded camping experience for larger
                groups. The area has two group campsites that can accommodate up
                to 50 people each, and each site is equipped with a picnic
                table, fire ring, and a grill. Restrooms with flush toilets and
                hot showers are also available.
              </li>
              <li className="pb-2">
                Lower Bay View Campground: The Lower Bay View Campground offers
                112 campsites with picturesque views of Clear Lake. The
                campsites are equipped with a picnic table, fire ring, and a
                grill, and the campground has restrooms with flush toilets and
                hot showers.
              </li>
              <li className="pb-2">
                Upper Bay View Campground: The Upper Bay View Campground has 147
                campsites with breathtaking views of Clear Lake. The campsites
                are equipped with a picnic table, fire ring, and a grill, and
                the campground has restrooms with flush toilets and hot showers.
              </li>
            </ul>
          </section>

          <section className="w-1/2 md:w-1/3 flex flex-col gap-4">
            <div className="flex text-center flex-col items-center justify-center bg-white border rounded-lg p-5 gap-5">
              {park.id && <CreateAlertButton park={park} />}
              <Link
                className="w-full text-center h-20 bg-slate-400 flex items-center justify-center border rounded-lg text-white text-xl font-bold shadow-md transition duration-300 hover:bg-slate-500"
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
  const parkId = 5;

  const { data } = await CLIENT.query({
    query: gql`
      query ClearLakeParkQuery($where: PlaceWhereUniqueInput!) {
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
