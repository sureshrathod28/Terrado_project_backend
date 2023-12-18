let express = require("express");
let taskSchema = require("../model/taskModel");
require("dotenv").config();
let authenticateUser = require("../middleware/middleware");
let jwt = require("jsonwebtoken");

let taskapp = express.Router();

taskapp.get("/usertask", authenticateUser, (req, res) => {
  jwt.verify(req.userId, process.env.Skey, (err, auth) => {
    if (err) {
      res.status(404).json({ message: "Invalid token" });
    } else {
      taskSchema.find({ user: auth._id })
        .then((record) => {
          res.status(200).json({ message: "Successfull", data: record });
        })
        .catch((err) => {
          res.status(500).json({ message: "Failed to fetch task" });
        });
    }
  });
});

taskapp.post('/usertask', authenticateUser, async (req, res) => {
  const { title, description } = req.body;
  const newTask = new taskSchema({ title, description });

  try {
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

taskapp.delete('/usertask/:id', authenticateUser, async (req, res) => {
  const taskId = req.params.id;

  try {
    await taskSchema.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

taskapp.put('/usertask/:id', authenticateUser, async (req, res) => {
  const { title, description } = req.body;
  const taskId = req.params.id;

  try {
    const updatedTask = await taskSchema.findByIdAndUpdate(taskId, { title, description }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


module.exports = taskapp;