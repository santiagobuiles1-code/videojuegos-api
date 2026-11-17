import { readVideojuegos, writeVideojuegos } from "../data/fileStore.js";

async function all() { return await readVideojuegos(); }
async function save(videojuegos) { await writeVideojuegos(videojuegos); }

export const videojuegoRepository = { all, save };