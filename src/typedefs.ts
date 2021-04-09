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
    artists: [AlbumArtist]
    genres: [String]
  }

  type AlbumArtist {
    id: String
    name: String
    genres: [String]
  }

  type Query {
    artists: [Artist]
    artist(id: String!): Artist
  }
`;
