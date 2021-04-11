import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typedefs';
import SpotifyAPI from './datasources';
import { Resolvers } from './generated/graphql';

// TODO test how necessary async/await is here
const resolvers: Resolvers = {
  Query: {
    artist: async (_, { id }, { dataSources }) => {
      return dataSources.spotifyAPI.getArtist(id);
    },
  },
  Artist: {
    albums: async (artist, __, { dataSources }) => {
      const res = await dataSources.spotifyAPI.getAlbumsByArtistId(artist.id);
      return res.items;
    },
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
  tracing: true,
});

server.listen().then(() => {
  console.log('HELLO THERE');
});
