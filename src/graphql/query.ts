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
    if (typeof args.isCompleted === "boolean") {
      const todos = await prisma.todo.findMany({
        where: {
          completed: args.isCompleted
        }
      });
      return todos;
    }
    const todos = await prisma.todo.findMany();
    return todos;
  }
};
