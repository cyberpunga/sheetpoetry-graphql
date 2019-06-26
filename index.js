require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const sheetpoetry = require("./sheetpoetry");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    sheetpoem(spreadsheetId: String!, range: String!, verses: Int): String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    sheetpoem: async (root, { spreadsheetId, range, verses }, context) =>
      await sheetpoetry(spreadsheetId, range, verses || 1)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
