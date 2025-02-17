import * as chai from 'chai';
const expect = chai.expect;
import *  as sinon from  'sinon';
import { prisma } from '../graphql/prisma';
import { Query } from '../graphql/query';
import { Context } from '../graphql/context';
import { graphql } from 'graphql';
import { schema } from '../graphql/schema';
import { Todo } from '@prisma/client';

const mockTodos: Todo[] = [
  { id: '1', title: 'Test Todo 1', completed: false, createdAt: new Date(), updatedAt: new Date(), dueDate: new Date() },
  { id: '2', title: 'Test Todo 2', completed: true, createdAt: new Date(), updatedAt: new Date(), dueDate: null },
];

describe('Todo tests', () => {

  it('should return correct todo for an id', async () => {

    prisma.todo.findUnique = sinon.stub().resolves(mockTodos[0]);
    
    const query = `
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
    const variables = { id : '1'};
    const context: Context = { prisma };

    const result = await graphql({
      schema: schema,
      source: query,
      variableValues: variables,
      contextValue: context
    });
    const expectedTodo = {
      ...mockTodos[0],
      createdAt: mockTodos[0].createdAt.getTime(),
      updatedAt: mockTodos[0].updatedAt.getTime(),
      dueDate: mockTodos[0].dueDate?.getTime()
    }
    expect(result?.data?.todo).to.deep.equal(expectedTodo);
  });
})