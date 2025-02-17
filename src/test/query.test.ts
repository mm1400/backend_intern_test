import * as chai from 'chai';
const expect = chai.expect;
import *  as sinon from  'sinon';
import { prisma } from '../graphql/prisma';
import { Query } from '../graphql/query';
import { Context } from '../graphql/context';
import { graphql } from 'graphql';
import { schema } from '../graphql/schema';

const mockTodos = [
  { id: '1', title: 'Test Todo 1', completed: false, createdAt: new Date(), updatedAt: new Date(), dueDate: new Date() },
  { id: '2', title: 'Test Todo 2', completed: true, createdAt: new Date(), updatedAt: new Date(), dueDate: null },
];

describe('Todo tests', () => {

  it('should return correct todo for an id', async () => {

    const stub = sinon.stub(prisma.todo, 'findUnique').resolves(mockTodos[0]);
    
    const res = await prisma.todo.findUnique({ where: { id: "1" } });
    console.log("Direct Prisma call result:", res);
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
    console.log(result);
    expect(result?.data?.todo).to.deep.equal(mockTodos[0]);
  });
})