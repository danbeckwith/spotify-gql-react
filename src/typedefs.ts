import { gql } from 'apollo-server';

export const typeDefs = gql`
  enum AlbumType {
    album
    single
    compilation
  }

  type Artist {
    id: String
    name: String
    genres: [String]
    albums: [Album]
  }

  type Album {
    name: String
    artists: [Artist]
    genres: [String]
    albumType: AlbumType
    album_type: AlbumType
  }

  type Query {
    artist(id: String!): Artist
  }
`;
