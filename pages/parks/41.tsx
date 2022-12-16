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
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px] flex flex-col items-center">
      <div className=" max-w-7xl">
        {" "}
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
        <div className="flex flex-row gap-10 w-full">
          <section className="w-2/3">
            <h2 className="font-bold text-xl pb-2">Park Overview</h2>
            <p className="pb-2">
              Big Basin Redwoods State Park is a beautiful and inspiring
              destination located in the Santa Cruz Mountains among the towering
              California Redwoods. The park offers a variety of accommodation
              options, including Big Basin Tent Cabins, which provide
              convenience and comfort in a stunning outdoor setting.
            </p>
            <p className="pb-2">
              The Big Basin Tent Cabins feature raised platforms with mattress
              pads, a table, a wood stove, and a lockable door. Each cabin also
              has a picnic table, fire ring, and space for one traditional tent
              outside. Best of all, these enclosed structures require no set-up,
              making them an easy and convenient option for travelers who don't
              own camping gear.
            </p>
            <p className="pb-2">
              For those who don't have their own camping equipment, the park
              offers Total Camping Packages that include sleeping bags, a cook
              stove, pots and pans, cooking utensils, a lantern, and a 60-quart
              cooler. The package also includes one bundle of wood and one bag
              of ice per night (up to two of each per reservation). This package
              is available for a small additional fee and can be reserved
              online. It is available for cabins #8, #9, #20, #28, and #29.
            </p>
            <p className="pb-2">
              For an even more luxurious experience, the park also offers Deluxe
              Cabins, which come with beds made up for your arrival (with
              sheets, towels, blankets, comforter, and pillows), curtains,
              lantern, bath towels, and washcloths. These cabins are available
              online and are offered for a small additional fee. They are
              available for cabins #6, #7, #10, #12, #13, #14, #30, and #31.
            </p>
            <h2 className="font-bold text-xl pb-2">Facilities</h2>
            <p className="pb-2">The facilities at {name} include:</p>
            <ul className="pb-2 list-disc list-inside">
              <li className="pb-2">
                The Huckleberry Tent Cabins at Big Basin Redwoods State Park
                offer a unique and comfortable camping experience in the midst
                of California's stunning redwood forests. Each cabin features a
                raised platform with a mattress pad, a table, and a lockable
                door for added security and privacy. The cabins also have a
                picnic table and a fire ring outside, providing the perfect spot
                for a scenic outdoor meal or a cozy campfire. The cabins are
                located in a wooded area of the park and are suitable for tents
                or small RVs. They are conveniently located near restrooms and
                drinking water, and they offer easy access to the park's many
                trails and attractions. Whether you are looking for a
                comfortable base camp for your adventures in the Santa Cruz
                Mountains or just a peaceful retreat from the hustle and bustle
                of everyday life, the Huckleberry Tent Cabins at Big Basin
                Redwoods State Park are an excellent choice.
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
  const parkId = 41;

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
