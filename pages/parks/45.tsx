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
import JuliaPfeifferBurnsImage from "../../resources/Julia-Pfeiffer-Burns/Julia_Pfeiffer_Burns.jpeg";

type Props = {
  park: Park;
};

function ParkPage({ park }: Props) {
  const name = "Julia Pfeiffer Burns State Park";

  return (
    <div className="w-full px-10 pt-10 pb-5 min-h-[1000px]">
      <div className="relative w-full pb-10">
        <FallbackImage
          alt={`photo of ${name}`}
          src={JuliaPfeifferBurnsImage}
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
            Julia Pfeiffer Burns State Park is a beautiful and diverse park
            located along the Big Sur coastline in California. The park
            stretches from the coastline into nearby ridges that rise up to
            3,000 feet in elevation. It is home to a wide variety of plant and
            animal life, including redwood, tan oak, madrone, chaparral, and an
            80-foot waterfall that drops from granite cliffs into the ocean.
          </p>
          <p className="pb-2">
            The park is also home to a 1,680-acre underwater reserve, which
            protects a stunning array of marine life. With a special-use permit,
            experienced divers can explore the reserve and see seals, sea lions,
            and sea otters in the park's cove. Hikers can also enjoy the park's
            backcountry via several trail systems.
          </p>
          <p className="pb-2">
            There is no park kiosk at Julia Pfeiffer Burns State Park for fee
            collection, and campers must register at Pfeiffer Big Sur State Park
            or Big Sur Station. The park is also available for special events
            such as weddings and small celebrations, but interested parties must
            contact Special Events at BigSurEvents@parks.ca.gov for more
            information.
          </p>
          <p className="pb-2">
            Julia Pfeiffer Burns State Park currently has no campgrounds but
            many other state parks surround it, including Limekiln and Pfeiffer
            Big Sure State Park, which are some of the best campgrounds in
            california. Some features of the park:
          </p>
          <h2 className="font-bold text-xl pb-2">Facilities</h2>
          <ul className="pb-2 list-disc list-inside">
            <li className="pb-2">
              Camping: There are no developed campsites within Julia Pfeiffer
              Burns State Park, but there are several nearby options for
              camping. The Pfeiffer Big Sur State Park has a campground with
              over 170 sites, and there are also several private campgrounds in
              the area.
            </li>
            <li className="pb-2">
              Picnic Areas: The park has several picnic areas with tables and
              barbecue grills, providing the perfect spot for a scenic outdoor
              meal.
            </li>
            <li className="pb-2">
              Hiking Trails: Julia Pfeiffer Burns State Park has several hiking
              trails that range in difficulty and length, offering something for
              hikers of all levels. The trails lead through the park's redwood
              forests, along the coastline, and to the 80-foot McWay Falls.
            </li>
            <li className="pb-2">
              Scenic Overlook: The park has a scenic overlook with panoramic
              views of the Big Sur coastline and the Pacific Ocean.
            </li>
            <li className="pb-2">
              Beach Access: The park has a small beach area that is accessible
              by a short hike from the parking lot. The beach is a popular spot
              for swimming, sunbathing, and picnicking.
            </li>
            <li className="pb-2">
              Restrooms: The park has several restroom facilities located
              throughout the park, providing convenient access for visitors.
            </li>
            <li className="pb-2">
              Parking: The park has a large parking lot near the entrance, with
              space for cars and RVs.
            </li>
            <li className="pb-2">
              Accessibility: Julia Pfeiffer Burns State Park has several
              wheelchair-accessible trails and facilities, making it an
              accessible destination for visitors with mobility impairments.
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
  const parkId = 45;

  const { data } = await CLIENT.query({
    query: gql`
      query JuliaPfeifferBurnsParkQuery($where: PlaceWhereUniqueInput!) {
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
