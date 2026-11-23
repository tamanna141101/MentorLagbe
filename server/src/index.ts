
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { auth } from "./lib/auth.js";
import tuitionRoutes from "./routes/tuition.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://mentorlagbe-beige.vercel.app",
  env.clientOrigin.replace(/\/$/, ""),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Better Auth route
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use("/api/tuitions", tuitionRoutes);
app.use("/api/applications", applicationRoutes);

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
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
