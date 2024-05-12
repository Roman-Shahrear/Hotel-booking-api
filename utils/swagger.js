import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "hotel-booking-api",
    description: `It's a just Hotel booking room management system crud operation.`,
  },
  host: "localhost:3002",
};

const outputFile = "./swagger-output.json";
const routes = [
  "../routes/authRoutes.js",
  "../routes/roomRoutes.js",
  "../routes/bookingRoutes.js",
];

swaggerAutogen()(outputFile, routes, doc);
