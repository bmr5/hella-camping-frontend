import type { NextPage } from "next";
import Head from "next/head";
import Campgrounds from "../components/Campgrounds";
import CTA from "../components/CTA";
import Header from "../components/Header";
import SearchTypeahead from "../components/SearchTypeahead";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex flex-col items-center justify-center">
        <CTA />
        <SearchTypeahead />
        <Campgrounds />
      </div>

      {/* Footer */}
    </div>
  );
};

export default Home;
