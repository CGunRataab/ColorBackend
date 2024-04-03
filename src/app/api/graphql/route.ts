import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { typeDefs } from "@/graphql/schemas/index";
import { resolverMiddleware, resolvers } from "@/graphql/resolvers";
import { ApolloLink } from "@apollo/client";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";

declare global {
  namespace PrismaJson {
    type LogMetaType = {
      r: number;
      g: number;
      b: number;
      hex: string;
      hsv: [number];
    };
  }
}
const schema = makeExecutableSchema({ typeDefs, resolvers });
const withMiddleware = applyMiddleware(schema, resolverMiddleware);
const server = new ApolloServer({
  schema: withMiddleware,
  typeDefs,
  introspection: true,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
