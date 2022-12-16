import { X_API_KEY, CLIENT } from "../pages/api/graphql/GraphqlConstants";
import { gql } from "@apollo/client";
import { Park } from "../pages";
import { manualParkPageList } from "../resources/TopParksList";

export async function getStaticPathsForParkIDs() {
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
  const paths = parks
    .map((park) => {
      const { id } = park;
      for (let i = 0; i < manualParkPageList.length; i++) {
        if (manualParkPageList[i] === id) {
          return null;
        }
      }
      return {
        params: {
          parkId: String(park.id),
        },
      };
    })
    .filter(Boolean);

  return {
    paths,
    fallback: false,
  };
}
