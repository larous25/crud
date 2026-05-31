import mongoose from "mongoose";

export default async function conexion() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Conexión a MongoDB abierta correctamente");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
}
