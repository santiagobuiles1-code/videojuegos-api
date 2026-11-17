import express from "express";
import { videojuegoRouter } from "./routes/videojuegoRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

export const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "videojuegos-api" });
});

app.use("/api/videojuegos", videojuegoRouter);

app.use(notFound);
app.use(errorHandler);