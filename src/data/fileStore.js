import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const dataUrl = new URL("../../data/videojuegos.json", import.meta.url);
const dataPath = fileURLToPath(dataUrl);

export async function readVideojuegos() {
  const raw = await readFile(dataPath, "utf8");
  return JSON.parse(raw);
}

export async function writeVideojuegos(videojuegos) {
  const json = JSON.stringify(videojuegos, null, 2) + "\n";
  await writeFile(dataPath, json, "utf8");
}