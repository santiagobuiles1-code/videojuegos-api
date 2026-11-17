import { videojuegoRepository } from "../repositories/videojuegoRepository.js";
import { AppError } from "../utils/AppError.js";

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

async function create(data) {
  const videojuegos = await videojuegoRepository.all();
  
  const nuevoId = `VGM-${String(videojuegos.length + 1).padStart(3, "0")}`;
  
  const nuevoJuego = {
    id: nuevoId,
    title: data.title,
    platform: data.platform,
    genre: data.genre,
    status: data.status || "pending",
    rating: data.rating || 0
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