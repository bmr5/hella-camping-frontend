import type { Park } from "..";
import { useSession } from "next-auth/react";

import React from "react";
import { GetStaticProps } from "next";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { gql } from "@apollo/client";
import { X_API_KEY, CLIENT } from "../api/graphql/GraphqlConstants";
import getStaticPathsForParkIDs from "../../hooks/getStaticPathsForParkIDs";
import AlertForm from "../../components/AlertForm";

type Props = {
  park: Park;
};

function Alerts({ park }: Props) {
  const { data: session } = useSession();
  if (session != null) {
    return (
      <main className="flex flex-col gap-5 items-center pt-5">
        <header className="border rounded-lg bg-black text-white w-3/4 h-20 flex items-center justify-center">
          <h1 className="font-extrabold text-3xl">{park.name}</h1>
        </header>

        <AlertForm park={park} />
      </main>
    );
  } else {
    <div>Error: Please Login First Before Creating An Alert</div>;
  }
}

export default Alerts;

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
