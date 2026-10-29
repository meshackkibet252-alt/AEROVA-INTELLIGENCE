
import Fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
  API_HOST: z.string().default("127.0.0.1"),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  WEB_ORIGIN: z.string().url().default("http://127.0.0.1:5173"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development")
});

const config = configSchema.parse(process.env);

const app = Fastify({
  logger: true,
  trustProxy: false,
  bodyLimit: 1_048_576
});

async function start() {
  await app.register(helmet);

  await app.register(cors, {
    origin: config.WEB_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false
  });

  app.get("/api/health", async () => ({
    status: "ok",
    application: "AIVORA Intelligence",
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString()
  }));

  app.setNotFoundHandler(async (_request, reply) => {
    return reply.code(404).send({
      error: "Not Found",
      message: "The requested API endpoint does not exist."
    });
  });

  app.setErrorHandler((error, request, reply) => {
    request.log.error({ err: error }, "API request failed");

    return reply.code(500).send({
      error: "Internal Server Error",
      message: "The request could not be completed."
    });
  });

  await app.listen({
    host: config.API_HOST,
    port: config.API_PORT
  });
}

start().catch((error: unknown) => {
  app.log.error(error, "Failed to start AIVORA API");
  process.exitCode = 1;
});
