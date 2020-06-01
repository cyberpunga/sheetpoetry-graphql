const cors = require("micro-cors")();
const { ApolloServer, gql } = require("apollo-server-micro");
const { sheetPoetry } = require("./src");

const typeDefs = gql`
  type Query {
    sheetpoem(spreadsheetId: String!, range: String!, verses: Int): String
  }
`;

const resolvers = {
  Query: {
    sheetpoem: async (root, { spreadsheetId, range, verses }, context) =>
      await sheetPoetry(spreadsheetId, range, verses || 1),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const handler = server.createHandler();

module.exports = cors((req, res) =>
  req.method === "OPTIONS" ? res.end() : handler(req, res)
);
