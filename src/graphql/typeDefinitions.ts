export const typeDefs = /* GraphQL */ `

  scalar Timestamp

  enum Sort {
  asc
  desc
  }

  enum DueDate {
    overdue
    upcoming
  }

  input TodoOrderByInput {
  title: Sort
  createdAt: Sort
  updatedAt: Sort
  }

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
    todos(
      isCompleted: Boolean, 
      take: Int, 
      skip: Int, 
      orderBy: TodoOrderByInput, 
      dueDate: DueDate)
      : [Todo]!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: Timestamp!
    updatedAt: Timestamp!
    dueDate: Timestamp!
  }
`;
