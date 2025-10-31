import mongoose, { Schema, Document, models } from 'mongoose'

// Single Chat ka type
interface IChat {
  id: string
  title: string
  response: string
}

// Pure Session ka type (ek array of chats)
export interface IChatSession extends Document {
  sessionId: string
  chats: IChat[]
  SectionTitle: string
}

// Sub-schema (for each chat object)
const ChatSchema = new Schema<IChat>(
  {
    title: { type: String, required: true },
    response: { type: String, required: true },
  },
  { timestamps: true }, // optional: disables automatic _id for subdocs
)

// Main schema — ek session jisme chats array hai
const ChatSessionSchema = new Schema<IChatSession>(
  {
    SectionTitle: { type: String, required: true },
    chats: [ChatSchema], // 👈 Array of chat objects
  },
  {
    timestamps: true,
  },
)

const ChatSession =
  models.ChatSession ||
  mongoose.model<IChatSession>('ChatSession', ChatSessionSchema)

export default ChatSession
