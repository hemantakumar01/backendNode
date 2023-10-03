import ErroHandeler from "../middleware/error.js";
import Task from "../modules/task.js";

export const newTask = async (req, res) => {
  const { title, description } = req.body;
  await Task.create({ title, description, user: req.user });
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const allTask = async (req, res) => {
  const userId = req.user._id;
  const taskes = await Task.find({ user: userId });
  res.status(200).json({
    success: true,
    taskes,
  });
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return next(new ErroHandeler("Task not found"), 403);

  task.isComplited = !task.isComplited;
  await task.save();
  res.status(200).json({
    success: true,
    message: "updated",
    task,
  });
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) return next(new ErroHandeler("Task not found", 404));
  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "deleted",
  });
};
