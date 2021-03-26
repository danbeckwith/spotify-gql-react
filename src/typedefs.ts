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
    genres: [String]
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