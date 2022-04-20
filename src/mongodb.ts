import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://template:template@template.jzp0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let promise: any = null;
export const dbConnect = () => {
  if (promise) return promise;
  promise = new Promise((resolve, reject) => {
    const conn = new MongoClient(uri);
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