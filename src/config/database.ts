import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add the databse url in .env file");
}
const MONGODB_URI: string = process.env.MONGODB_URI;

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => {
        console.log("Connection has been established.");
        return mongoose;
      })
      .catch((error) => {
        console.log(error as Error);
      });
  }
  cached.conn = await cached.promise;

  return cached.conn;
}

async function disconnectDB() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("Database connection closed.");
  }
}

export { connectDB, disconnectDB };
// export default connectDB;
