const cors = require("micro-cors")();
const { ApolloServer, gql } = require("apollo-server-micro");
const sheetpoetry = require("./sheetpoetry");

const typeDefs = gql`
  type Query {
    sheetpoem(spreadsheetId: String!, range: String!, verses: Int): String
  }
`;

const resolvers = {
  Query: {
    sheetpoem: async (root, { spreadsheetId, range, verses }, context) =>
      await sheetpoetry(spreadsheetId, range, verses || 1)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

module.exports = cors(server.createHandler());
