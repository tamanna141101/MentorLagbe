import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { auth } from "./lib/auth.js";

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  }),
);

// Better Auth route
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "MentorLagbe API is running",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
};

startServer();