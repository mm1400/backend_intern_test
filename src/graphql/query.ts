import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
  todo: async (_, { id }, { prisma }) => {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      }
    });
    return todo
  },
  todos: async (_, args, { prisma }) => {
    const todos = await prisma.todo.findMany({
      where : {
        completed: args.isCompleted ?? undefined
      },
      skip: args.skip ?? 0,
      take: args.take ?? undefined
    })
    return todos;
  }
};
