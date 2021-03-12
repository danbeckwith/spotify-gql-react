import { ApolloServer, gql } from 'apollo-server';
import spotifyClient from './spotifyClient';

console.log('Henk');

const typeDefs = gql`
  type Artist {
    name: String
    genre: String
    albums: [Album]
  }

  type Album {
    name: String
    label: String
  }

  type Query {
    artists: [Artist]
  }
`;

const artists = [
  {
    name: 'Mental Cruelty',
    genre: 'Slamming Deathcore',
  },
  {
    name: '100 Gecs',
    genre: 'Hyperpop',
  },
];

const albums = [
  {
    name: '1000 Gecs',
    label: 'Self-released',
    artist: '100 Gecs',
  },
  {
    name: 'Inferis',
    label: 'Unique Leader Records',
    artist: 'Mental Cruelty',
  },
];

const resolvers = {
  Query: {
    artists: () => artists,
  },
  Artist: {
    albums: (parent) => albums.filter((album) => album.artist === parent.name),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log('HELLO Small BOY');
});
