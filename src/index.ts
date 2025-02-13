import express from "express";
import { yogaPublicRouter } from "./graphql/schema";
import { cleanStack } from "./utils";
import { environment } from "./environment";

const app = express();
const port = environment.PORT;

app.use("/graphql", yogaPublicRouter);

app.get("/", (req, res) => {
  // redirect to the graphql playground
  res.redirect("/graphql");
});

app.listen(port, () => {
  return console.info(`Express is listening at http://localhost:${port}`);
});

process.on("unhandledRejection", (reason: unknown) => {
  if (reason instanceof Error) {
    console.error(`unhandledRejection`, {
      message: reason.message,
      stack: cleanStack(reason.stack),
    });
  } else if (typeof reason === "string") {
    console.error(`unhandledRejection`, {
      message: reason,
    });
  }
});

process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException`, {
    message: error.message,
    stack: cleanStack(error.stack),
  });
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.info(`SIGTERM signal received.`);
  console.info(`Closing http server.`);
  process.exit(0);
});

process.on("SIGINT", () => {
  console.info(`SIGTERM signal received.`);
  console.info(`Closing http server.`);
  process.exit(0);
});
