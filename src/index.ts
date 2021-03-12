import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typedefs';
import SpotifyAPI from './datasources';

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
    artist: async (_, __, { dataSources }) => {
      return dataSources.spotifyAPI.getArtist();
    },
  },
  Artist: {
    albums: (parent) => albums.filter((album) => album.artist === parent.name),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      spotifyAPI: new SpotifyAPI(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log('HELLO Small BOY');
});
