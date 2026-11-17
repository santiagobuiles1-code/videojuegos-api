import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/videojuegos.json");

async function ensureFileExists() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
  }
}

async function all() {
  await ensureFileExists();
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function save(videojuegos) {
  await ensureFileExists();
  await fs.writeFile(filePath, JSON.stringify(videojuegos, null, 2), "utf-8");
}

export const videojuegoRepository = {
  all,
  save
};