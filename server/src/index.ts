import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { env } from "./config/env.js";
import { connectDB, getDB } from "./config/db.js";
import { auth } from "./lib/auth.js";

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  })
);

// Better Auth route must come before express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to MentorLagbe API",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "MentorLagbe server is running",
    database: getDB().databaseName,
    timestamp: new Date().toISOString(),
  });
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`MentorLagbe server running on port ${env.port}`);
  });
};

startServer();