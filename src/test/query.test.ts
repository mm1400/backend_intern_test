import * as chai from 'chai';
const expect = chai.expect;
import *  as sinon from  'sinon';
import { prisma } from '../graphql/prisma';
import { Context } from '../graphql/context';
import { graphql } from 'graphql';
import { schema } from '../graphql/schema';
import { Todo } from '@prisma/client';


// https://github.com/prisma/prisma/discussions/18734
// https://daily.dev/blog/graphql-testing-for-beginners#schema-tests


const mockTodos: Todo[] = [
  { id: '1', title: 'Test Todo 1', completed: false, createdAt: new Date(), updatedAt: new Date(), dueDate: new Date() },
  { id: '2', title: 'Test Todo 2', completed: true, createdAt: new Date(), updatedAt: new Date(), dueDate: null },
];

const todoQuery = `
  query GetTodo($id: ID!) {
    todo(id: $id) {
      id
      title
      completed
      createdAt
      updatedAt
      dueDate
    }
  }

`

const todosQuery  = `
  query GetTodos($orderBy: TodoOrderByInput, $isCompleted: Boolean, $dueDate: DueDate, $skip: Int, $take: Int) {
    todos(orderBy: $orderBy, isCompleted: $isCompleted, dueDate: $dueDate, skip: $skip, take: $take) {
      id
      title
      completed
      createdAt
      updatedAt
      dueDate
    }
  }
`

const executeQuery = async (query: string, variables: any) => {
  const context: Context = { prisma };
  return await graphql({
    schema: schema,
    source: query,
    variableValues: variables,
    contextValue: context
  });

}
describe('Todo tests', () => {

  afterEach(function () {
    sinon.restore();
  });

  it('should return correct todo for an id', async () => {

    prisma.todo.findUnique = sinon.stub().resolves(mockTodos[0]);
    
    const variables = { id : '1'};

    const result = await executeQuery(todoQuery, variables);

    const expectedTodo = {
      ...mockTodos[0],
      createdAt: mockTodos[0].createdAt.getTime(),
      updatedAt: mockTodos[0].updatedAt.getTime(),
      dueDate: mockTodos[0].dueDate?.getTime()
    }
    expect(result?.data?.todo).to.deep.equal(expectedTodo);
  });

  it("should return null if id doesn't exist", async () => {

    sinon.replace(prisma.todo, 'findUnique', sinon.fake.resolves(null));

    const variables = { id : '999999999'};

    const result = await executeQuery(todoQuery, variables);

    expect(result?.data?.todo).to.be.null;
  });
});

describe('Todos tests', () => {

  afterEach(() => {
    sinon.restore();
  })

  it('should return all todos', async () => {
    prisma.todo.findMany = sinon.stub().resolves(mockTodos);
    
    const result = await executeQuery(todosQuery, {});

    expect(result?.data?.todos).to.deep.equal(
      mockTodos.map(todo => ({
        ...todo,
        createdAt: todo.createdAt.getTime(),
        updatedAt: todo.updatedAt.getTime(),
        dueDate: todo.dueDate?.getTime() ?? null
      }))
    )
  });

});