import { MongoClient, Db } from "mongodb";
import { env } from "./env.js";

export const mongoClient = new MongoClient(env.mongodbUri);

let database: Db;

const requiredCollections = [
  "users",
  "tuitions",
  "applications",
  "payments",
];

export const connectDB = async (): Promise<Db> => {
  try {
    await mongoClient.connect();

    database = mongoClient.db(env.dbName);

    const existing = await database.listCollections().toArray();
    const existingNames = existing.map((item) => item.name);

    for (const name of requiredCollections) {
      if (!existingNames.includes(name)) {
        await database.createCollection(name);
      }
    }

    console.log("MongoDB connected successfully");
    console.log(`Application database: ${env.dbName}`);

    return database;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export const getDB = (): Db => {
  if (!database) {
    throw new Error("Database is not connected");
  }

  return database;
};

// Better Auth uses a separate database so the
// four assignment collections remain separate.
export const getAuthDB = (): Db => {
  return mongoClient.db("mentorlagbe_auth");
};