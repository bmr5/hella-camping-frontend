import React from "react";

type Campground = {};

function Campgrounds() {
  return <div>Campgrounds</div>;
}

export default Campgrounds;

export const getServerSideProps = async () => {
  const campgrounds: [Campground] = [{}];

  return {
    props: {
      campgrounds,
    },
  };
};
