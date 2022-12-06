import type { NextPage } from "next";
import Head from "next/head";
import CTA from "../components/CTA";
import SearchTypeahead from "../components/SearchTypeahead";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import Footer from "../components/Footer";
import TopParks from "../components/TopParks";
import { gql } from "@apollo/client";
import { X_API_KEY, CLIENT } from "./api/graphql/GraphqlConstants";

export type Park = {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  facilities?: Facility[];
  highlights?: string;
  description?: string;
  originID?: number;
};

export type Facility = {
  availabilityRequests?: any;
  name?: string;
  id?: number;
  originFacilityId?: number;
  originPlaceId?: number;
  place?: Park;
  sites?: any[];
};

const Home: NextPage = ({
  parks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isTypeaheadShown, setIsTypeaheadShown] = useState(false);

  return (
    <div className="">
      <Head>
        <title>HellaCamping | Home</title>
        <meta name="keywords" content="camping reservation notifications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center px-10 xl:px-20 min-h-screen position relative">
        <CTA />
        <SearchTypeahead
          parks={parks}
          setIsTypeaheadShown={setIsTypeaheadShown}
        />
        {isTypeaheadShown === false && <TopParks parks={parks} />}
        <Footer />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await CLIENT.query({
    query: gql`
      query HomePageParksQuery {
        listPlaces {
          id
          name
          imageUrl
        }
      }
    `,
    context: { headers: { "x-api-key": X_API_KEY } },
  });

  return {
    props: {
      parks: data.listPlaces,
    },
  };
};
