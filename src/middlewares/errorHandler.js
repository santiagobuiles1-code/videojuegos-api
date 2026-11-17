export function notFound(req, res) {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Ruta no encontrada"
    }
  });
}

export function errorHandler(err, req, res, next) {
  const status = Number(err.status ?? 500);
  const code = err.code ?? "INTERNAL_ERROR";
  const message = status >= 500 ? "Error interno del servidor" : err.message;

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    error: {
      code,
      message
    }
  });
}