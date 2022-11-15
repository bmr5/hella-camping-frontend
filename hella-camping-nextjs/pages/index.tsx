import type { NextPage } from "next";
import Head from "next/head";
import Campgrounds from "../components/Campgrounds";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchTypeahead from "../components/SearchTypeahead";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";

export type Campground = {
  slug: string;
  "place-id": number;
  name: string;
  latitude: number;
  longitude: number;
};

const Home: NextPage = ({
  campgrounds,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex flex-col items-center justify-center">
        <CTA />
        <SearchTypeahead campgrounds={campgrounds} />
        <Campgrounds campgrounds={campgrounds} />
        <Footer />
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const campgrounds: [Campground] = await fetch(
    "https://dev.hellacamping.in/parks"
  ).then((res) => res.json());

  return {
    props: {
      campgrounds,
    },
  };
};
