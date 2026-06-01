import logger from "./logger.js";

export default function errorHandler(err, req, res, next) {
  logger.error({
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    stack: err.stack,
  });

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const payload = {
    error: err.message || "Internal Server Error",
  };

  if (req.accepts("html")) {
    return res.status(status).render("error", {
      error: payload.error,
      status,
    });
  }

  return res.status(status).json(payload);
}
