import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Artist {
    name: String
    genres: [String]
    albums: [Album]
  }

  type Album {
    name: String
    label: String
    artists: [AlbumArtist]
  }

  type AlbumArtist {
    name: String
    genres: [String]
  }

  type Query {
    artists: [Artist]
    artist(id: String!): Artist
  }
`;
