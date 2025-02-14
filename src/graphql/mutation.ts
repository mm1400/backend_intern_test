import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";

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
    try {
      const todo = await prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
      return todo;
    } catch (error) {
      return null;
    }
  }
};
