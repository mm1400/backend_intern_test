import { z } from "zod";

const config = z.object({
  DATABASE_URL: z.string(),
  PORT: z
    .string()
    .optional()
    .default("4000")
    .transform((val) => parseInt(val)),
});

type Config = z.infer<typeof config>;

export const environment: Config = config.parse(process.env);
