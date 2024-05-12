import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, `Unauthorized: No token found`));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, `Unauthorized: Token verification failed`));
    }
    req.user = user;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(401, `Unauthorized: No user found in token`));
  }

  if (req.user.role !== "admin") {
    return next(errorHandler(403, `Forbidden: Only Admin users are allowed`));
  }
  next();
};
