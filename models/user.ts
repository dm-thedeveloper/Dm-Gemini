import mongoose, { Schema, model, models } from 'mongoose'

type UserSchemaTypes = {
  name: string
  email: string
  // password?: string // optional for OAuth users
  image?: string
  GoogleId?: string
  JWT: string
}

const userSchema = new Schema<UserSchemaTypes>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      // unique: true,
      required: true,
    },
    // password: { type: String },
    image: { type: String },
    JWT: String,
    GoogleId: { type: String },
  },
  { timestamps: true }, // keep _id default
)
const User = models.User || model('User', userSchema)
export default User
