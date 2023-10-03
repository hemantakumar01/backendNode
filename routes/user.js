import express from "express";
import {
  Logout,
  createUser,
  findSingleUser,
  getAllUsers,
  loginUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.get("/users/all", getAllUsers);

router.post("/users/new", createUser);
router.post("/users/login", loginUser);
router.post("/users/logout", Logout);

router.route("/users/me").get(isAuthenticated, findSingleUser);

export default router;
