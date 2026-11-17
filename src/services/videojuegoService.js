import { AppError } from "../errors/AppError.js";
import { createVideojuegoId, platforms, statuses } from "../domain/videojuegoRules.js";
import { videojuegoRepository } from "../repositories/videojuegoRepository.js";

async function list() {
  return videojuegoRepository.all();
}

async function getById(id) {
  const videojuegos = await videojuegoRepository.all();
  const videojuego = videojuegos.find((item) => item.id === id);
  if (!videojuego) throw new AppError(404, "GAME_NOT_FOUND", "Videojuego no encontrado");
  return videojuego;
}

async function create(input) {
  const { title, platform, genre, status, rating } = input ?? {};

  if (!title || !platform || !genre || !platforms.includes(platform)) {
    throw new AppError(400, "INVALID_INPUT", "Datos incompletos o plataforma inválida");
  }

  const videojuegos = await videojuegoRepository.all();
  const nuevoJuego = {
    id: createVideojuegoId(videojuegos),
    title,
    platform,
    genre,
    status: status ?? "pending",
    rating: rating ?? 0
  };

  videojuegos.push(nuevoJuego);
  await videojuegoRepository.save(videojuegos);
  return nuevoJuego;
}

async function remove(id) {
  const videojuegos = await videojuegoRepository.all();
  const index = videojuegos.findIndex((item) => item.id === id);
  if (index < 0) throw new AppError(404, "GAME_NOT_FOUND", "Videojuego no encontrado");

  videojuegos.splice(index, 1);
  await videojuegoRepository.save(videojuegos);
}

export const videojuegoService = { list, getById, create, remove };