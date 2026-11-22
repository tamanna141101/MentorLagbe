import { MongoClient, Db } from "mongodb";
import { env } from "./env.js";

const client = new MongoClient(env.mongodbUri);

let database: Db;

const requiredCollections = [
  "users",
  "tuitions",
  "applications",
  "payments",
];

export const connectDB = async (): Promise<Db> => {
  try {
    await client.connect();

    database = client.db(env.dbName);

    const existingCollections = await database
      .listCollections()
      .toArray();

    const existingNames = existingCollections.map(
      (collection) => collection.name
    );

    for (const collectionName of requiredCollections) {
      if (!existingNames.includes(collectionName)) {
        await database.createCollection(collectionName);
      }
    }

    console.log("MongoDB connected successfully");
    console.log(`Database: ${env.dbName}`);
    console.log("Required collections are ready");

    return database;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export const getDB = (): Db => {
  if (!database) {
    throw new Error("Database is not connected yet");
  }

  return database;
};