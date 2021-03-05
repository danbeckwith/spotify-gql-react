import { ApolloServer, gql } from 'apollo-server';

console.log('Henk');

const typeDefs = gql`
  type Artist {
    name: String
    genre: String
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

const resolvers = {
  Query: {
    artists: () => artists,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log('HELLO BIG BOY');
});
