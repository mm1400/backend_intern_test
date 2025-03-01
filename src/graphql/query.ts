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
    if (args.orderBy && Object.keys(args.orderBy).length > 1) {
      throw new GraphQLError("orderBy is only available for one field at a time");
    }
    if (args.dueDate && args.dueDate !== 'overdue' && args.dueDate !== 'upcoming') {
      throw new GraphQLError("dueDate must be either 'overdue' or 'upcoming'");
    }
    const skip = args?.skip ?? 0;
    const take = args?.take ?? 10;

    if (skip < 0 || take < 0) {
      throw new GraphQLError("skip and take must be positive integers");
    }

    const dueDateFilters = {
      overdue: { lt: new Date() } ,
      upcoming: { gt: new Date() },
    }
    const todos = await prisma.todo.findMany({
      where : {
        completed: args.isCompleted ?? undefined,
        dueDate: args.dueDate ? dueDateFilters[args.dueDate] : undefined
      },
      orderBy: {
        title: args.orderBy?.title ?? undefined,
        createdAt: args.orderBy?.createdAt ?? undefined,
        updatedAt: args.orderBy?.updatedAt ?? undefined
      },
      skip: skip,
      take: take
    })
    return todos;
  }
};
