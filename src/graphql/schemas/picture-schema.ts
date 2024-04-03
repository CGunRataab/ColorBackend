import gql from "graphql-tag";

export const picturesTypeDefs = gql`
  type ColorTypeQuery {
    r: Float!
    g: Float!
    b: Float!
    hex: String!
    hsv: [Float]!
  }
  type Picture {
    id: ID!
    title: String!
    description: String!
    photo: String!
    color: ColorTypeQuery!
    userId: ID!
    username: String!
  }
  input ColorType {
    r: Float!
    g: Float!
    b: Float!
    hex: String!
    hsv: [Float]!
  }
  input PictureCreateInput {
    title: String!
    description: String!
    photo: String!
    color: ColorType!
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
    getUsersPictureList(token: String!): [Picture]
    getSearchPictures(search: String, color: String): [Picture]
  }
  type Mutation {
    createPicture(input: PictureCreateInput!): Picture
    updatePicture(input: PictureUpdateInput!): Picture
    deletePicture(input: PictureDeleteInput!): Picture
  }
`;
