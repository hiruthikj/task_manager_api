const Task = require('../models/Task');
const { StatusCodes, OK } = require('http-status-codes');

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  return res.status(StatusCodes.OK).json({ tasks });
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.status(StatusCodes.CREATED).json({ task });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ err });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findById(taskID);
    return res.status(StatusCodes.OK).json({ task });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ err });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete(taskID);
    if (!task) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `Task with id ${taskID} not found` });
    }
    return res.status(StatusCodes.OK).json({ task });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `Task with id ${taskID} not found` });
    }
    return res.status(StatusCodes.OK).json({ task });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ err });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
};
