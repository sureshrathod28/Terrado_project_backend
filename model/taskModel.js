const mongoose=require("mongoose")

const task=new mongoose.Schema({
    title: String,
  description: String,
})
const taskSchema=mongoose.model('TaskData',task)
module.exports=taskSchema