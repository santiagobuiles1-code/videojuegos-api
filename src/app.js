import express from "express";
import { videojuegoRouter } from "./routes/videojuegoRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

export const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Servidor funcionando correctamente" });
});

app.use("/api/videojuegos", videojuegoRouter);
app.use(notFound);
app.use(errorHandler);