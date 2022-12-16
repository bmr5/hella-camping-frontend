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
import AnzaBorregoDesertImage from "../../resources/Anza-Borrego-Desert/Anza_Borrego_Desert.jpeg";

type Props = {
  park: Park;
};

function ParkPage({ park }: Props) {
  const name = "Anza Borrego Desert State Park";

  return (
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px]">
      <div className="relative w-full pb-10">
        <FallbackImage
          alt={`photo of ${name}`}
          src={AnzaBorregoDesertImage}
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
            Anza-Borrego Desert State Park is a vast and varied wilderness
            located in Southern California. It is the largest state park in the
            contiguous United States, covering over 600,000 acres of stunning
            desert landscape.
          </p>
          <p className="pb-2">
            The park is named after Spanish explorer Juan Bautista de Anza and
            the Spanish word "borrego," meaning bighorn sheep. It is home to a
            wide variety of plant and animal life, including palm groves,
            wildflowers, cacti, and a variety of wildlife such as roadrunners,
            golden eagles, kit foxes, mule deer, and bighorn sheep.
          </p>
          <p className="pb-2">
            The park is a paradise for hikers, with over 500 miles of dirt roads
            and miles of hiking trails that offer unparalleled opportunities to
            explore the wonders of the Colorado Desert. Visitors can also enjoy
            the park's sweeping vistas, washes, and numerous opportunities to
            spot wildlife such as iguanas, chuckwallas, and the red diamond
            rattlesnake.
          </p>
          <p className="pb-2">
            To get to Anza-Borrego Desert State Park, most visitors approach
            from the east via Highways S22, S2, or 78. Visitors coming from San
            Diego can also take Highways 79 and 78, which pass through the
            mountainous Cuyamaca Rancho State Park before descending into the
            desert.
          </p>
          <h2 className="font-bold text-xl pb-2">Facilities</h2>
          <p className="pb-2">The facilities at {name} include:</p>
          <ul className="pb-2 list-disc list-inside">
            <li className="pb-2">
              Borrego Palm Canyon (sites 53-89): This campground is located in a
              beautiful canyon setting and is suitable for tents, trailers, and
              RVs. Each campsite has a picnic table and fire ring, and there are
              restrooms and showers nearby.
            </li>
            <li className="pb-2">
              Borrego Palm Canyon (sites 1-52): This campground is also located
              in a beautiful canyon setting and is suitable for tents, trailers,
              and RVs. Each campsite has a picnic table and fire ring, and there
              are restrooms and showers nearby.
            </li>
            <li className="pb-2">
              Borrego Palm Canyon (sites 90-120): This campground is located in
              a beautiful canyon setting and is suitable for tents, trailers,
              and RVs. Each campsite has a picnic table and fire ring, and there
              are restrooms and showers nearby.
            </li>
            <li className="pb-2">
              Tamarisk Grove Campground: This campground is located in a wooded
              area of the park and is suitable for tents, trailers, and RVs.
              Each campsite has a picnic table and fire ring, and there are
              restrooms and showers nearby.
            </li>
            <li className="pb-2">
              Borrego Palm Canyon Group (G1-G5): These group campsites are
              located in a beautiful canyon setting and are suitable for tents,
              trailers, and RVs. They include a large, sheltered picnic area
              with tables and barbecue grills, as well as access to nearby
              restrooms and showers. These campsites are suitable for groups of
              up to 25 people.
            </li>
            <li className="pb-2">
              Vern Whitaker Horse Camp: This campground is designed specifically
              for horse enthusiasts and is located in a wooded area of the park.
              It includes a staging area, hitching rails, and corrals, as well
              as access to nearby restrooms and showers. It is suitable for
              tents and trailers.
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
  const parkId = 1;

  const { data } = await CLIENT.query({
    query: gql`
      query AnzaBorregoDesertParkQuery($where: PlaceWhereUniqueInput!) {
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
