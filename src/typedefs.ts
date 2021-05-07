import { gql } from 'apollo-server';

export const typeDefs = gql`
  directive @renameField(name: String!) on FIELD_DEFINITION

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
    popularity: Int
  }

  type Album {
    name: String
    artists: [Artist]
    genres: [String]
    albumType: AlbumType @renameField(name: "album_type")
  }

  type Query {
    artist(id: String!): Artist
    searchArtist(name: String!): [Artist]
  }
`;
