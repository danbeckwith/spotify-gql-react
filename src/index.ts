import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typedefs';
import SpotifyAPI from './datasources';

// TODO test how necessary async/await is here
const resolvers = {
  Query: {
    artist: async (_, { id }, { dataSources }) => {
      return await dataSources.spotifyAPI.getArtist(id);
    },
  },
  Artist: {
    // TODO this will need pagination
    albums: async (artist, __, { dataSources }) => {
      const res = await dataSources.spotifyAPI.getAlbumsByArtistId(artist.id);
      return res.items;
    },
  },
  AlbumArtist: {
    genres: async (album, __, { dataSources }) => {
      // console.log(album);
      return await dataSources.spotifyAPI.getArtist(album.id);
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
