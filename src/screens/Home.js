import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import PageTitle from "../components/auth/PageTitle";
import { SHOPS_FRAGMENT } from "../fragments";
import Shop from "../shop/Shop";

const SEE_COFFEESHOPS = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      ok
      error
      shops {
        ...ShopsFragment
        user {
          id
          username
          avatarUrl
        }
        photos {
          id
          url
        }
        categories {
          id
          name
        }
      }
    }
  }
  ${SHOPS_FRAGMENT}
`;

const Home = () => {
  const page = 1;
  const { data } = useQuery(SEE_COFFEESHOPS, {
    variables: {
      page,
    },
  });
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeCoffeeShops?.shops?.map((shop) => (
        <Shop key={shop.id} {...shop} />
      ))}
    </div>
  );
};

export default Home;
