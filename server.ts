import express from 'express'
import route from './src/route'
var cors = require('cors')
const app = express()
app.set("port", process.env.PORT || 3001);
app.use(cors())
app.use(express.json())
app.use(route)
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(app.get("port"), () => {
    console.log(`Server on http://localhost:${app.get("port")}/`);
  });