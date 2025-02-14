export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
  }

  type Something {
    id: ID!
    name: String!
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
  }

  type Query {
    hello: String
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: timestamp
    updatedAt: timestamp
  }
`;
