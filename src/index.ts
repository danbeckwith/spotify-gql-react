import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typedefs';
import dataSources from './dataSources';
import { Resolvers } from './generated/graphql';
import { renameField } from './directives/renameField';
import { ContextType } from './contextType';

const resolvers: Resolvers<ContextType> = {
  Query: {
    artist: (_, { id }, { dataSources }) => dataSources.spotify.getArtistById(id),
    searchArtist: (_, { name }, { dataSources }) => dataSources.spotify.searchArtistByName(name),
  },
  Artist: {
    albums: (artist, __, { dataSources }) => dataSources.spotify.getAlbumsByArtistId(artist.id),
    genres: async (artist, __, { dataSources }) => {
      const res = await dataSources.spotify.getArtistById(artist.id);
      return res.genres;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  schemaDirectives: {
    renameField,
  },
});

server.listen().then(() => {
  console.log('HELLO THERE');
});
