import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllRooms } from "../controllers/roomController.js";
import {
  bookingRoom,
  cancelBookingRoom,
  updateBookingRoom,
} from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", verifyToken, getAllRooms);
router.post("/bookingroom", verifyToken, bookingRoom);
router.put("/updatebookingroom/:id", verifyToken, updateBookingRoom);
router.delete("/cancelbookingroom/:id", verifyToken, cancelBookingRoom);

export default router;
