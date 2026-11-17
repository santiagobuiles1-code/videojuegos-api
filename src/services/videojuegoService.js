import { videojuegoRepository } from "../repositories/videojuegoRepository.js";
import { AppError } from "../errors/AppError.js";
import { platforms, statuses, createVideojuegoId } from "../domain/videojuegoRules.js";

async function findAll() {
  return await videojuegoRepository.all();
}

async function findById(id) {
  const videojuegos = await videojuegoRepository.all();
  const juego = videojuegos.find((item) => item.id === id);

  if (!juego) {
    throw new AppError(404, "GAME_NOT_FOUND", "Videojuego no encontrado");
  }

  return juego;
}

function validate(data, { partial = false } = {}) {
  const { title, platform, genre, status, rating } = data;
  const missing = (v) => typeof v !== "string" || v.trim() === "";

  if ((!partial || title !== undefined) && missing(title))
    throw new AppError(400, "VALIDATION_ERROR", "title es obligatorio");
  if ((!partial || genre !== undefined) && missing(genre))
    throw new AppError(400, "VALIDATION_ERROR", "genre es obligatorio");
  if ((!partial || platform !== undefined) && !platforms.includes(platform))
    throw new AppError(400, "VALIDATION_ERROR", `platform debe ser: ${platforms.join(", ")}`);
  if (status !== undefined && !statuses.includes(status))
    throw new AppError(400, "VALIDATION_ERROR", `status debe ser: ${statuses.join(", ")}`);
  if (rating !== undefined && (!Number.isInteger(rating) || rating < 0 || rating > 5))
    throw new AppError(400, "VALIDATION_ERROR", "rating debe ser un entero entre 0 y 5");
}

async function create(data = {}) {
  validate(data);
  const videojuegos = await videojuegoRepository.all();

  const nuevoJuego = {
    id: createVideojuegoId(videojuegos),
    title: data.title.trim(),
    platform: data.platform,
    genre: data.genre.trim(),
    status: data.status ?? "pending",
    rating: data.rating ?? 0
  };

  videojuegos.push(nuevoJuego);
  await videojuegoRepository.save(videojuegos);

  return nuevoJuego;
}

async function update(id, patch = {}) {
  const videojuegos = await videojuegoRepository.all();
  const index = videojuegos.findIndex((item) => item.id === id);

  if (index < 0) {
    throw new AppError(404, "GAME_NOT_FOUND", "Videojuego no encontrado");
  }

  const allowed = ["title", "platform", "genre", "status", "rating"];
  const changes = Object.fromEntries(
    Object.entries(patch).filter(([key]) => allowed.includes(key))
  );

  if (Object.keys(changes).length === 0) {
    throw new AppError(400, "EMPTY_PATCH", "No hay campos permitidos para actualizar");
  }

  validate(changes, { partial: true }); // NUEVA LÍNEA

  videojuegos[index] = { ...videojuegos[index], ...changes };
  await videojuegoRepository.save(videojuegos);

  return videojuegos[index];
}

async function remove(id) {
  const videojuegos = await videojuegoRepository.all();
  const index = videojuegos.findIndex((item) => item.id === id);

  if (index < 0) {
    throw new AppError(404, "GAME_NOT_FOUND", "Videojuego no encontrado");
  }

  videojuegos.splice(index, 1);
  await videojuegoRepository.save(videojuegos);
}

export const videojuegoService = {
  findAll,
  findById,
  create,
  update,
  remove
};