import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { typeDefs } from "@/graphql/schemas/index";
import { resolvers } from "@/graphql/resolvers";

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

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
