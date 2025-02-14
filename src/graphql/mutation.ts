import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";
import { GraphQLError } from "graphql";
import { Prisma } from '@prisma/client'

// for error handling: https://the-guild.dev/graphql/yoga-server/tutorial/basic/09-error-handling
export const Mutation: IMutation<Context> = {
  createSomething: async (_, { input }, { prisma }) => {
    const something = await prisma.something.create({
      data: {
        name: input.name,
      },
    });

    return {
      id: something.id,
      name: something.name,
    };
  },
  createTodo: async (_, { input }, { prisma }) => {
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
      },
    });
    // return value must match everything from Todo type
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  },
  deleteTodo: async (_, { input }, { prisma }) => {
      const todo = await prisma.todo.delete({
        where: {
          id: input.id,
        },
      })
      .catch((err: unknown) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          return Promise.reject(
            new GraphQLError(`Cannot delete non existant todo with id:'${input.id}'.`)
          ) 
        }
        return Promise.reject(err)
      });
      return todo;
  },
  updateTodo: async (_, { input }, { prisma }) => {
    const data : { title?: string, completed?: boolean } = {};
    if (input.title) {
      data.title = input.title;
    }
    if (input.completed) {
      data.completed = input.completed;
    }
    const todo = await prisma.todo.update({
      where: {
        id: input.id,
      },
      data: {
        title: data.title,
        completed: data.completed,
      },
    })
    .catch((err: unknown) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return Promise.reject(
          new GraphQLError(`Cannot delete non existant todo with id:'${input.id}'.`)
        ) 
      }
      return Promise.reject(err)
    });
    return todo;
  }
};
