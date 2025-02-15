import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";
import { GraphQLError } from "graphql";

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
    if (args.orderBy && Object.keys(args.orderBy).length  > 0) {
      throw new GraphQLError("orderBy is only available for one field at a time");
    }
    const todos = await prisma.todo.findMany({
      where : {
        completed: args.isCompleted ?? undefined
      },
      orderBy: {
        title: args.orderBy?.title ?? undefined,
        createdAt: args.orderBy?.createdAt ?? undefined,
        updatedAt: args.orderBy?.updatedAt ?? undefined
      },
      skip: args.skip ?? 0,
      take: args.take ?? undefined
    })
    return todos;
  }
};
