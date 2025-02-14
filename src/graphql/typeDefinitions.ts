export const typeDefs = /* GraphQL */ `

  scalar Timestamp

  input CreateSomethingInput {
    name: String!
  }
  
  input CreateTodoInput {
    title: String!
  }

  input DeleteTodoInput {
    id: ID!
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    completed: Boolean
  }

  type Something {
    id: ID!
    name: String!
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(input: CreateTodoInput!): Todo!
    deleteTodo(input: DeleteTodoInput!): Todo
    updateTodo(input: UpdateTodoInput!): Todo
  }

  type Query {
    hello: String
    todo(id: ID!): Todo
    todos: [Todo]!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: Timestamp!
    updatedAt: Timestamp!
  }
`;
