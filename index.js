const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()
let authRoute=require('./router/authRouter')
let taskRoute=require('./router/taskRouter')

const app=express()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Database successfully connected')
}).catch(()=>{
    console.log('Failed to connect with database')
})
app.use(bodyparser.json())
app.use(cors({}))
app.use('/',authRoute)
app.use('/',taskRoute)

app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port ${process.env.PORT}`)
})
