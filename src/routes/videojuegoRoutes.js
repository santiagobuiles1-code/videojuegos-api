import { Router } from "express";
import {
  listVideojuegos,
  getVideojuego,
  createVideojuego,
  updateVideojuego, // <--- 1. Asegúrate de importarlo
  deleteVideojuego
} from "../controllers/videojuegoController.js";

export const videojuegoRouter = Router();

videojuegoRouter.get("/", listVideojuegos);
videojuegoRouter.get("/:id", getVideojuego);
videojuegoRouter.post("/", createVideojuego);
videojuegoRouter.patch("/:id", updateVideojuego);
videojuegoRouter.delete("/:id", deleteVideojuego);