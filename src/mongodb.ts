import { MongoClient } from "mongodb";
import dontenv from 'dotenv'
dontenv.config()
let promise: any = null;
export const dbConnect = () => {
  if (promise) return promise;
  promise = new Promise((resolve, reject) => {
    const conn = new MongoClient(process.env.MONGO_DB_URI || '');
    conn
      .connect()
      .then(() => {
        return resolve(conn.db("file_host"));
      })
      .catch((err: any) => {
        reject(err);
      });
  });
  return promise;
};