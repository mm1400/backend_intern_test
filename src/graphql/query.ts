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
};
