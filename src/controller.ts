import { Request, Response } from "express";
import Model from "./model";
const model = new Model()
class Controller {
    private static instance: Controller;
    constructor() {
        if (Controller.instance) {
            return Controller.instance;
        }
        Controller.instance = this;
    }
    getFiles = async (req: Request, res: Response) => {
        const { filter = {} } = req.body
        return res.send(await model.getItems('file', filter))
    }

    getFile = async (req: Request, res: Response) => {
        const { params: { id = '' } = {}, body: { user_id = '' } = {} } = req
        try {
            const response = await model.getItem('file', id, user_id)
            const { result: { user_id: file_user_id = '' } = {} }: any = response
            if (user_id === file_user_id) return res.send(response)
            return res.sendStatus(404)
        } catch (error) {
            return res.sendStatus(404)
        }
    }

    uploadFile = async (req: Request, res: Response) => {
        const { filesUploaded = [], user_id } = req.body
        const data = filesUploaded.map(({ filename = '', mimetype = '', size = 0, url = '', handle = '' }) => ({ user_id, filename, mimetype, size, url, handle }))
        model.insertItem('file', { type: 'UPLOAD_FILE', data })
    }

    deleteFile = async (req: Request, res: Response) => {
        const { params: { id = '' } = {}, body: { user_id = '', handle = '' } = {} } = req
        return res.send(await model.deleteItem('file',id,user_id,handle))
    }
}

export default Controller