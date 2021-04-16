import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typedefs';
import SpotifyAPI from './datasources';
import { Resolvers } from './generated/graphql';

const resolvers: Resolvers = {
  Query: {
    artist: (_, { id }, { dataSources }) => dataSources.spotifyAPI.getArtist(id),
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
  Album: {
    albumType: (album) => album.album_type,
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

server.listen().then(() => {
  console.log('HELLO THERE');
});
