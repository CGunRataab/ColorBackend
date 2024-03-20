import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    password: String!
    email: String!
  }
  input UserUpdate {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  input UserCreateInput {
    name: String!
    password: String!
    email: String!
  }
  input UserDelete {
    id: ID!
  }
  input UserLogin {
    id: ID
    email: String!
    password: String!
  }

  type Query {
    getUserList: [User]
    getUser(id: ID): User
  }
  type Mutation {
    createUser(input: UserCreateInput!): User
    deleteUser(input: UserDelete!): User
    updateUser(input: UserUpdate!): User
    loginUser(input: UserLogin!): User
  }
`;
