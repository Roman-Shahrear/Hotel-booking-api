import Booking from "../models/BookingModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import { isValidObjectId } from "mongoose";

// ------------------> BookingRoom ------------------------------->
export const bookingRoom = async (req, res, next) => {
  try {
    // -------------> Validation input data ---------------------->
    const { roomId, checkInDate, checkOutDate } = req.body;
    if (
      !roomId ||
      !checkInDate ||
      !checkOutDate ||
      roomId === "" ||
      checkInDate === "" ||
      checkOutDate === ""
    ) {
      next(errorHandler(400, `Missing required fields`));
    }
    // ----------> Get id from token --------->
    const userId = req.user.id;
    const bookingRoom = await Booking.create({
      user: userId,
      room: roomId,
      checkInDate,
      checkOutDate,
    });
    res.status(201).json({ message: `Booking successfully`, bookingRoom });
  } catch (error) {
    next(errorHandler(500, `Failed to Booking room`));
  }
};

// ------------> Update Booking room ------------->
export const updateBookingRoom = async (req, res, next) => {
  try {
    // --------------> Take booking id from request parameters --------------->
    const { id } = req.params;

    // ------------> Validation booking id ---------->
    if (!isValidObjectId(id)) {
      return next(errorHandler(400, "Invalid booking ID"));
    }

    // ----------------> Validation input data ------------>
    const { checkInDate, checkOutDate } = req.body;
    if (!checkInDate || !checkOutDate) {
      return next(errorHandler(400, "Missing required fields"));
    }

    // Search booking from the database
    const booking = await Booking.findById(id);
    if (!booking) {
      return next(errorHandler(404, "Booking not found"));
    }

    // Check the booking belongs to the user
    if (booking.user.toString() !== req.user.id) {
      return next(
        errorHandler(403, "You are not authorized to update this booking")
      );
    }

    // Update the booking with new data
    booking.checkInDate = checkInDate;
    booking.checkOutDate = checkOutDate;

    // Save the updated booking
    const updatedBooking = await booking.save();

    // Send response with updated booking
    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to update booking"));
  }
};

// ------------------> Cancel Booking ------------------------------->
export const cancelBookingRoom = async (req, res, next) => {
  try {
    //  ------------> Delete Booking Room --------------->
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return next(errorHandler(404, `Cancel Booking not found`));
    }
    res
      .status(200)
      .json({ message: `Cancel Booking succesfully`, deletedBooking });
  } catch (error) {
    return next(errorHandler(404, `Failed to Cancel Booking`));
  }
};
