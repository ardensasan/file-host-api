import express from 'express'
import Controller from './controller'
const route = express()
const controller = new Controller()

route.post('/file/:id', controller.getFile)
route.post('/files', controller.getFiles)
route.post('/upload', controller.uploadFile)

export default route