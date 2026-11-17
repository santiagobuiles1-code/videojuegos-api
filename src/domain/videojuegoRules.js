export const platforms = ["PC", "PlayStation", "Xbox", "Nintendo", "Multiplataforma"];
export const statuses = ["pending", "playing", "completed"];

export function createVideojuegoId(videojuegos) {
  const max = videojuegos.reduce((acc, item) => {
    const numericPart = Number(item.id.split("-")[1]) || 0;
    return Math.max(acc, numericPart);
  }, 0);
  return `VGM-${String(max + 1).padStart(3, "0")}`;
}