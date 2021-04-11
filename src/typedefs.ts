import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Artist {
    id: String
    name: String
    genres: [String]
    albums: [Album]
  }

  type Album {
    name: String
    label: String
    artists: [Artist]
    genres: [String]
  }

  type Query {
    artist(id: String!): Artist
  }
`;
