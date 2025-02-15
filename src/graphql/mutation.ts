import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";
import { GraphQLError } from "graphql";
import { Prisma } from '@prisma/client'
import { z } from "zod";

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
    const dateSchema = z.coerce.number().transform((val) => new Date(val));
    // if a string is passed, it gets converted to null
    if (input.dueDate === null) {
      throw new GraphQLError(`Invalid date format for dueDate: '${input.dueDate}'. Must be a timestamp in milliseconds as a number. Strings are not allowed.`);
    }
    if (input.dueDate && !dateSchema.parse(input.dueDate)) {
      throw new GraphQLError(`Invalid date format for dueDate: '${input.dueDate}'. Must be a timestamp in milliseconds as a number.`);
    }
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
        dueDate: input.dueDate ?? undefined,
      },
    });
    // return value must match everything from Todo type
    return todo;
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
    if (Object.keys(input).length === 0) {
        throw new GraphQLError(`Cannot update todo with empty input.`)
    }
    const todo = await prisma.todo.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title ?? undefined,
        completed: input.completed ?? undefined,
        updatedAt: new Date(),
        dueDate: input.dueDate ?? undefined,
      },
    })
    .catch((err: unknown) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new GraphQLError(`Cannot update non existant todo with id:'${input.id}'`)
      }
      return Promise.reject(err)
    });
    return todo;
  }
};
