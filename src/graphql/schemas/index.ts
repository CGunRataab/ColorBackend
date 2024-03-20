import { mergeTypeDefs } from "graphql-tools-merge-typedefs";
import { picturesTypeDefs } from "./picture-schema";
import { userTypeDefs } from "./user-schema";

export const typeDefs = mergeTypeDefs([picturesTypeDefs, userTypeDefs]);
