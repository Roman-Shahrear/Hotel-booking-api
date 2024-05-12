import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import fs from 'fs';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// For Read file swagger-ouputfiile
const swaggerDocument = JSON.parse(fs.readFileSync('./utils/swagger-output.json', 'utf8'));

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* -----Routes----- */
app.use("/api/auth", authRoutes);
app.use("/api/admin/room", roomRoutes);
app.use("/api/user/booking", bookingRoutes);

/* -----Mongoose Setup----- */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} Can not connect on Server`));
