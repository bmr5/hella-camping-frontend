import type { NextPage } from "next";
import Head from "next/head";
import Facilities from "../components/Facilities";
import CTA from "../components/CTA";
import SearchTypeahead from "../components/SearchTypeahead";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import Footer from "../components/Footer";

export type Park = {
  slug: string;
  "place-id": number;
  name: string;
  latitude: number;
  longitude: number;
};

export type Facility = {
  name: string;
  "origin-facility-id": number;
  "origin-place-id": number;
  slug: string;
};

const Home: NextPage = ({
  parks,
  facilities,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isTypeaheadShown, setIsTypeaheadShown] = useState(false);
  return (
    <div className="">
      <Head>
        <title>HellaCamping | Home</title>
        <meta name="keywords" content="camping reservation notifications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center px-10 xl:px-20 sm:pt-5">
        <CTA />
        <SearchTypeahead
          facilities={facilities}
          parks={parks}
          setIsTypeaheadShown={setIsTypeaheadShown}
        />
        {isTypeaheadShown === false && (
          <Facilities facilities={facilities} parks={parks} />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const parks: [Park] = await fetch("https://dev.hellacamping.in/parks").then(
    (res) => res.json()
  );

  const facilities: [Facility] = await fetch(
    "https://dev.hellacamping.in/facilities"
  ).then((res) => res.json());

  return {
    props: {
      parks,
      facilities,
    },
  };
};
