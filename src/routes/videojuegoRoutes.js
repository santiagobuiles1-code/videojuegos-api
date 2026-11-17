import { Router } from "express";
import {
  listVideojuegos,
  getVideojuego,
  createVideojuego,
  deleteVideojuego
} from "../controllers/videojuegoController.js";

export const videojuegoRouter = Router();

videojuegoRouter.get("/", listVideojuegos);
videojuegoRouter.get("/:id", getVideojuego);
videojuegoRouter.post("/", createVideojuego);
videojuegoRouter.delete("/:id", deleteVideojuego);