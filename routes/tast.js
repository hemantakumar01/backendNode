import express from "express";
import bcrypt from "bcrypt";
import {
  allTask,
  deleteTask,
  newTask,
  updateTask,
} from "../controllers/tsak.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/tasks", isAuthenticated, allTask);
router
  .route("/tasks/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
