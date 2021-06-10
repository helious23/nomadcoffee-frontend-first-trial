import gql from "graphql-tag";

export const SHOPS_FRAGMENT = gql`
  fragment ShopsFragment on CoffeeShop {
    id
    name
    latitude
    longitude
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on Comment {
    id
    username
    avatarUrl
  }
`;
