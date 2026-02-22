import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

// Global cache object (prevents multiple DB connections in dev mode)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  // If already connected, return existing connection
  if (cached.conn) return cached.conn;

  // If no promise exists, create new connection promise
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "YT-NEXTJS-ECOMMERCE",
      bufferCommands: false,
    });
  }

  // Wait for connection to complete
  cached.conn = await cached.promise;

  return cached.conn;
};