import { X_API_KEY, CLIENT } from "../pages/api/graphql/GraphqlConstants";
import { gql } from "@apollo/client";
import { Park } from "../pages";

async function getStaticPathsForParkIDs() {
  const { data } = await CLIENT.query({
    query: gql`
      query HomePageParksQuery {
        listPlaces {
          id
        }
      }
    `,
    context: { headers: { "x-api-key": X_API_KEY } },
  });

  const parks: Park[] = data.listPlaces;
  const paths = parks.map((park) => {
    return {
      params: {
        parkId: String(park.id),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export default getStaticPathsForParkIDs;
