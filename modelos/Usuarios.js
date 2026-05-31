import mongoose from 'mongoose'

const { Schema } = mongoose

const usuariosSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Usuarios', usuariosSchema)