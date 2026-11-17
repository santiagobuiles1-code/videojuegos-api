import { videojuegoService } from "../services/videojuegoService.js";

export async function listVideojuegos(req, res, next) {
  try {
    const juegos = await videojuegoService.list();
    res.status(200).json({ data: juegos, count: juegos.length });
  } catch (error) {
    next(error);
  }
}

export async function getVideojuego(req, res, next) {
  try {
    const juego = await videojuegoService.getById(req.params.id);
    res.status(200).json({ data: juego });
  } catch (error) {
    next(error);
  }
}

export async function createVideojuego(req, res, next) {
  try {
    const juego = await videojuegoService.create(req.body);
    res.location(`/api/videojuegos/${juego.id}`).status(201).json({ data: juego });
  } catch (error) {
    next(error);
  }
}

export async function updateVideojuego(req, res, next) {
  try {
    const juegoActualizado = await videojuegoService.update(req.params.id, req.body);
    res.status(200).json({ data: juegoActualizado });
  } catch (error) {
    next(error);
  }
}

export async function deleteVideojuego(req, res, next) {
  try {
    await videojuegoService.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}