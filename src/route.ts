import express from 'express'
import Controller from './controller'
import dotenv from 'dotenv'
dotenv.config()
const route = express()
const controller = new Controller()

route.post('/file/:id', controller.getFile)
route.post('/delete/:id', controller.deleteFile)
route.post('/files', controller.getFiles)
route.post('/upload', controller.uploadFile)

export default route