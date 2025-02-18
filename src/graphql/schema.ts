import "reflect-metadata";
import { Router } from "express";
import { createYoga, createSchema, useExtendContext } from "graphql-yoga";
import { typeDefs } from "./typeDefinitions";
import { prisma } from "./prisma";
import { Query } from "./query";
import { Mutation } from "./mutation";
import { Timestamp } from "./timestamp";

const yogaPublicRouter = Router();

const schema = createSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Timestamp,
  },
});

const yoga = createYoga({
  schema,
  graphiql: true,
  healthCheckEndpoint: "/health",
  landingPage: false,
  logging: true,
  plugins: [
    useExtendContext(async (ctx) => {
      return {
        ...ctx,
        prisma: prisma,
      };
    }),
  ],
});
yogaPublicRouter.use(yoga);

export { yogaPublicRouter, yoga as yogaPublic, schema };
