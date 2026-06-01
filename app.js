// configuraciones principales
import "dotenv/config";

import cors from "cors";
import helmet from "helmet";

import path from "path";
import favicon from "serve-favicon";
import express from "express";
import http from "http";

import logger from "./middlewares/logger.js";
import requestLogger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";

import { fileURLToPath } from "url";

import rutas from "./controles/rutas.js";
import conexion from "./configuracion/conexion.js";

// reemplazo de __dirname y __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

global._Proyecto = __dirname;
process.env.ENTORNO ||= "desarrollo";

/* ------------- muy sexi barra separadora --------------- */

const app = express();
const server = http.createServer(app);

export default app;

/* ------------- muy sexi barra separadora --------------- */

/*
directorio de archivos estaticos
motor de renderizacion de vistas
favicon
*/
app.use("/publicos", express.static(path.join(__dirname, "estaticos")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "vistas"));
app.use(favicon(path.join(__dirname, "estaticos", "favicon.ico")));

// Cross-origin resource sharing
app.use(helmet());
app.use(cors());

// Parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// identificador para cada request
app.use((req, res, next) => {
  req.requestId = crypto.randomUUID();
  next();
});

// Middleware de logs
app.use(requestLogger);

// rutas
app.use(rutas);

/* eventos del servidor */
server.on("listening", () => {
  logger.info(`server is running on port:\t${process.env.PUERTO}`);
  logger.info(`http://127.0.0.1:${process.env.PUERTO}`);
});

/* ------------- muy sexi barra separadora --------------- */

// si no encuentra la url
app.use((req, res) => {
  res.status(404);

  const msn = "Not found";

  if (req.accepts("html")) {
    if (app.get("env") === "production") {
      return res.render("404", { url: req.url });
    }

    return res.send(
      `posiblemente no existe la ruta ${req.url}, así que estás apuntando mal`,
    );
  }

  if (req.accepts("json")) {
    return res.json({ error: msn });
  }

  res.send(msn);
});

// error handler
app.use(errorHandler);

// por si todo falla
process
  .on("uncaughtException", (err) => {
    console.error("fatal error:", err);
    process.exit(1);
  })
  .on("unhandledRejection", (err, promise) => {
    console.error(`ha ocurrido un error en la promesa ${promise}:`, err);
    process.exit(1);
  });

// inicio
try {
  await conexion();

  server.listen(process.env.PUERTO, () => {
    console.log(`Servidor iniciado en puerto ${process.env.PUERTO}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
