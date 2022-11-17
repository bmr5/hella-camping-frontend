import { GetStaticProps } from "next";
import React from "react";
import { Facility } from "..";

type Props = {
  facility: Facility;
};

function FacilityPage({ facility }: Props) {
  return (
    <div>
      <h2>{facility.name}</h2>
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
