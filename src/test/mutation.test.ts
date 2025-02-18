import * as chai from 'chai';
const expect = chai.expect;
import * as sinon from 'sinon';
import { prisma } from '../graphql/prisma';
import { Context } from '../graphql/context';
import { graphql } from 'graphql';
import { schema } from '../graphql/schema';

const createTodoMutation = `
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      title
      completed
      createdAt
      updatedAt
      dueDate
    }
  }
`;

const deleteTodoMutation = `
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      title
      completed
      createdAt
      updatedAt
      dueDate
    }
  }
`;

const updateTodoMutation = `
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      title
      completed
      createdAt
      updatedAt
      dueDate
    }
  }
`;

const mockTodo = {
  id: '1',
  title: 'test',
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  dueDate: null
};

const executeMutation = async (mutation: string, variables: any) => {
  const context: Context = { prisma };
  return await graphql({
    schema,
    source: mutation,
    variableValues: variables,
    contextValue: context
  });
};

describe('CreateTodo tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a todo', async () => {

    prisma.todo.create = sinon.stub().resolves(mockTodo);

    const variables = { input: { title: 'test', dueDate: 88888822} };

    const result = await executeMutation(createTodoMutation, variables);

    const expectedTodo = {
      ...mockTodo,
      createdAt: mockTodo.createdAt.getTime(),
      updatedAt: mockTodo.updatedAt.getTime(),
      dueDate: null
    };

    expect(result?.data?.createTodo).to.deep.equal(expectedTodo);

  });

  it('should throw an error if dueDate is a string', async () => {
    const variables = { input: { title: 'test', dueDate: '7777777777' } };

    const result = await executeMutation(createTodoMutation, variables);

    expect(result?.errors?.[0].message).to.exist;
  });

});

describe('DeleteTodo tests', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('should delete a todo', async () => {

    prisma.todo.delete = sinon.stub().resolves(mockTodo);

    const variables = { input: { id: '1' } };

    const result = await executeMutation(deleteTodoMutation, variables);

    const expectedTodo = {
      ...mockTodo,
      createdAt: mockTodo.createdAt.getTime(),
      updatedAt: mockTodo.updatedAt.getTime(),
      dueDate: null
    };

    expect(result?.data?.deleteTodo).to.deep.equal(expectedTodo);
  
  });

  describe('UpdateTodo tests', () => {
    
    afterEach(() => {
      sinon.restore();
    });

    it('should update a todo', async () => {

      prisma.todo.update = sinon.stub().resolves(mockTodo);

      const variables = { input: { id: '1', title: 'test', completed: true, dueDate: 88888888 } };

      const result = await executeMutation(updateTodoMutation, variables);

      const expectedTodo = {
        ...mockTodo,
        createdAt: mockTodo.createdAt.getTime(),
        updatedAt: mockTodo.updatedAt.getTime(),
        dueDate: null
      };

      expect(result?.data?.updateTodo).to.deep.equal(expectedTodo); 
    });

    it('should throw an error if input is empty', async () => {
      const variables = { input: {} };

      const result = await executeMutation(updateTodoMutation, variables);

      expect(result?.errors?.[0].message).to.exist;
    });
  });
});