import gql from "graphql-tag";

export const picturesTypeDefs = gql`
  type Picture {
    id: ID!
    title: String!
    description: String!
    photo: String!
    color: String!
    userId: ID!
    username: String!
  }

  input PictureCreateInput {
    title: String!
    description: String!
    photo: String!
    color: String!
    userId: ID!
    username: String!
  }

  input PictureUpdateInput {
    title: String
    description: String!
  }
  input PictureDeleteInput {
    id: ID!
    userId: ID!
  }

  type Query {
    getPictureList: [Picture]
    getPicture(id: ID): Picture
  }
  type Mutation {
    createPicture(input: PictureCreateInput!): Picture
    updatePicture(input: PictureUpdateInput!): Picture
    deletePicture(input: PictureDeleteInput!): Picture
  }
`;
