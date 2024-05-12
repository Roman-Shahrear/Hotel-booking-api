import Room from "../models/RoomModel.js";
import { errorHandler } from "../utils/errorHandler.js";

// ------------------> get rooms ----------------------->
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.json({ message: `Get all the room`, rooms });
  } catch (error) {
    next(errorHandler(500, `Failed to get room`));
  }
};

// ------------------> Create room --------------------->
export const createRoom = async (req, res, next) => {
  try {
    // ---------> Take input from body ----------->
    const { number, type, price } = req.body;
    // ---------> Create room ----------->
    const room = await Room.create({ number, type, price });
    res.status(201).json({ message: `Create room successfully`, room });
  } catch (error) {
    next(errorHandler(500, `Failed to create room`));
    console.log(error);
  }
};

// ------------------> Update room --------------------------->
export const updateRoom = async (req, res, next) => {
  try {
    // ---------> Take input from body ----------->
    const { number, type, price } = req.body;
    // ---------> Updating room ----------->
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { number, type, price },
      { new: true }
    );

    if (!updatedRoom) {
      return next(errorHandler(404, `Room not found`));
    }
    res.json({ message: `Update Room Successfully`, updatedRoom });
  } catch (error) {
    next(errorHandler(500, `Failed to update room: ${error.message}`));
  }
};

// ------------------> Delete room -------------------------->
export const deleteRoom = async (req, res, next) => {
  try {
    // ---------> Delete room ----------->
    const deleteRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deleteRoom) {
      return next(errorHandler(404, `Room not found`));
    }
    res.json({ message: `Delete Room Successfully`, deleteRoom });
  } catch (error) {
    next(errorHandler(500, `Failed to delete room`));
  }
};
