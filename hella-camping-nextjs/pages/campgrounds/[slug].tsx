import { GetStaticProps } from "next";
import React from "react";
import { Facility } from "..";
import Image from "next/image";
import Link from "next/link";

type Props = {
  facility: Facility;
};

function FacilityPage({ facility }: Props) {
  const facilityImageUrl =
    facility.imageURL ?? "https://www.gstatic.com/webp/gallery/4.webp";
  return (
    <div className="w-full px-10 pt-10 bg-neutral-100">
      <div className="relative w-full pb-10">
        <Image
          alt={`photo of ${facility.name}`}
          src={facilityImageUrl}
          width={600}
          height={600}
          className="rounded-xl object-cover h-52 w-full"
          priority
        />
        <div className="absolute text-white border border-red-500 w-full h-full top-0 flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">{facility.name}</h1>
          <h1 className="font-bold text-xl">Park Name Here</h1>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="border border-blue-500 w-4/6">
          <h1 className="font-extrabold text-3xl pb-2">Overview</h1>
          <h2 className="font-bold text-xl pb-2">Park Overview</h2>
          <p className="pb-2">
            Jumbo Rocks Campground lies amid the huge, steep rock formations for
            which Joshua Tree National Park is known. Close proximity to many
            boulders and rock formations, it is a popular camping location for
            families with kids. Jumbo Rocks is one of four campgrounds in the
            park that requires reservations year-round. To get the most out of
            your visit Plan Like a Park Ranger Travelers who enjoy warm, dry
            winters flock to Joshua Tree from October through May, when
            temperatures hover between 70-90 degrees during the day and drop to
            a 40-60 degree range at night. Summer is the park's off-season due
            to the uncomfortably-high desert heat. Jumbo Rocks is at an
            elevation of 4,380 feet.
          </p>
          <h2 className="font-bold text-xl pb-2">Recreation</h2>
          <p className="pb-2">
            Rock scramblers flock to Jumbo Rocks Campground for the variety of
            geological formations and warmer temperatures that can be found in
            the interior of the park. Several hiking trails also leave from the
            campground. There is a short interpretive nature trail and plenty of
            rocks and canyons to explore within the facility. Clear desert skies
            are perfect for star-gazing.
          </p>
          <h2 className="font-bold text-xl pb-2">Facilities</h2>
          <p className="pb-2">
            This large facility has 124 individual tent and RV campsites. There
            are no hookups or drinking water in the campground, however the town
            of Twentynine Palms is 12 miles away and provides basic amenities.
            The park allows six people and two vehicles per site, however, some
            sites are small and may not accommodate the maximum number of people
            and vehicles. See site details for specifics.
          </p>
        </div>

        <div className="w-2/6 border border-black ">
          <div className="flex flex-col items-center justify-center bg-white border rounded-lg p-5 gap-5">
            <button className="h-20 bg-emerald-300 w-full border rounded-lg text-white text-xl font-bold shadow-md">
              Create Alert
            </button>
            <Link
              className="w-full h-20 bg-slate-300 flex items-center justify-center border rounded-lg text-white text-xl font-bold shadow-md"
              href={facility.url ?? "/"}
            >
              View on Gov site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityPage;

export const getStaticPaths = async () => {
  const facilities: [Facility] = await fetch(
    "https://dev.hellacamping.in/facilities"
  ).then((res) => res.json());

  const paths = facilities.map((facility) => {
    return {
      params: {
        slug: facility.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  const facility: [Facility] = await fetch(
    `https://dev.hellacamping.in/facilities/${slug}`
  ).then((res) => res.json());

  return {
    props: {
      facility,
    },
  };
};
