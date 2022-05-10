import axios from "axios";
import { ObjectId } from "mongodb";
import { dbConnect } from "./mongodb";
class Model {
    private static instance: Model;
    constructor() {
        if (Model.instance) {
            return Model.instance;
        }
        Model.instance = this;
    }

    getItems = async (endpoint: string, filter = {}) => {
        const db = await dbConnect();
        let response = "SUCCESS";
        const result = await new Promise((resolve, reject) => {
            db.collection(endpoint)
                .find(filter)
                .toArray((err: any, result: any) => {
                    if (err) {
                        response = "ERROR";
                        reject();
                    }
                    return resolve(result);
                });
        });
        return { type: response, result: result };
    };

    insertItem = async (endpoint: string, requestData: any) => {
        const db = await dbConnect();
        const { type, data } = requestData;
        let response = type;
        if (data instanceof Array) {
            db.collection(endpoint).insertMany(data, (err: any, res: any) => {
                if (err) return (response = "ERROR");
                return { count: 1 };
            });
        } else {
            db.collection(endpoint).insertOne(data, (err: any, res: any) => {
                if (err) return (response = "ERROR");
                return { count: res.insertedCount };
            });
        }
        return { type: response };
    };

    getItem = async (collection: string, id: any, user_id: string) => {
        const db = await dbConnect();
        let response = "SUCCESS";
        const result = await new Promise((resolve, reject) => {
            db.collection(collection).findOne(
                { _id: new ObjectId(id), user_id },
                (err: any, result: any) => {
                    if (err) {
                        response = "ERROR";
                        reject();
                    }
                    return resolve(result);
                }
            );
        });
        return { type: response, result: result };
    };

    updateItem = async (endpoint: string, data: any) => {
        const db = await dbConnect();
        const { _id, ...rest } = data.data;
        const response = new Promise((resolve, reject) => {
            db.collection(endpoint).updateOne(
                { _id: new ObjectId(_id) },
                { $set: rest },
                (err: any, res: any) => {
                    if (err) reject("ERROR");
                    resolve("SUCCESS");
                }
            );
        });
        return response;
    };

    deleteItem = async (collection: string, id: any, user_id: string, handle: string) => {
        const db = await dbConnect();
        const response = new Promise((resolve, reject) => {
            db.collection(collection).deleteOne(
                { _id: new ObjectId(id), user_id, handle },
                async (err: any, res: any) => {
                    if (err) {
                        reject("ERROR");
                    }
                    resolve("SUCCESS");
                }
            );
        });
        axios.delete(`${process.env.REACT_APP_FILESTACK_API}/${handle}?key=${process.env.REACT_APP_FILESTACK_API_KEY}&policy=${process.env.REACT_APP_FILESTACK_POLICY}&signature=${process.env.REACT_APP_FILESTACK_SIGNATURE}`)
        return response;
    };
}

export default Model