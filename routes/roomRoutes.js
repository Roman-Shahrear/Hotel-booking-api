import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  updateRoom,
} from "../controllers/roomController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllRooms);
router.post("/create", verifyToken, isAdmin, createRoom);
router.put("/updateroom/:id", verifyToken, isAdmin, updateRoom);
router.delete("/deleteroom/:id", verifyToken, isAdmin, deleteRoom);

export default router;
