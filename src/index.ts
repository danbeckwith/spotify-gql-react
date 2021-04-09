import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typedefs';
import SpotifyAPI from './datasources';
import { Resolvers } from './generated/graphql';

// TODO test how necessary async/await is here
// typescript isn't enforcing on gql stuff
const resolvers: Resolvers = {
  Query: {
    artist: async (_, { id }, { dataSources }) => {
      return await dataSources.spotifyAPI.getArtist(id);
    },
  },
  Artist: {
    albums: async (artist, __, { dataSources }) => {
      const res = await dataSources.spotifyAPI.getAlbumsByArtistId(artist.id);
      return res.items;
    },
  },
  AlbumArtist: {
    genres: async (artist, __, { dataSources }) => {
      const res = await dataSources.spotifyAPI.getArtist(artist.id);
      return res.genres;
    },
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
  console.log('HELLO THERE');
});
