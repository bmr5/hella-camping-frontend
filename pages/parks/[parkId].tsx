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
import { getStaticPathsForParkIDs } from "../../hooks/getStaticPathsForParks";
import CreateAlertButton from "../../components/CreateAlertButton";

type Props = {
  park: Park;
};

function ParkPage({ park }: Props) {
  const { imageUrl, facilities, name, id } = park;

  const facilityNames = facilities?.map((facility) => {
    return (
      <li className="list-disc list-inside" key={facility.name}>
        {facility.name}
      </li>
    );
  });

  return (
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px]">
      <div className="relative w-full pb-10">
        <FallbackImage
          alt={`photo of ${name}`}
          src={imageUrl ?? ""}
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
          <h1 className="font-extrabold text-3xl pb-2">Overview</h1>
          <h2 className="font-bold text-xl pb-2">Park Overview</h2>
          <p className="pb-2">{park.description}</p>
          <h2 className="font-bold text-xl pb-2">Facilities</h2>
          <ul className="pb-2">
            <p className="pb-2">The facilities at {name} include:</p>
            {facilityNames}
          </ul>
        </section>

        <section className="w-1/2 md:w-1/3 flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center bg-white border rounded-lg p-5 gap-5">
            {park.id && <CreateAlertButton parkID={park.id} />}
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

export const getStaticPaths = async () => {
  return getStaticPathsForParkIDs();
};

export const getStaticProps: GetStaticProps = async (context) => {
  const parkId = context.params?.parkId;

  const { data } = await CLIENT.query({
    query: gql`
      query SingleParkQuery($where: PlaceWhereUniqueInput!) {
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
