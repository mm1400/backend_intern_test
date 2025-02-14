export const typeDefs = /* GraphQL */ `

  scalar Timestamp

  input CreateSomethingInput {
    name: String!
  }
  
  input CreateTodoInput {
    title: String!
  }

  type Something {
    id: ID!
    name: String!
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(input: CreateTodoInput!): Todo!
  }

  type Query {
    hello: String
    todo: Todo
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
`;
