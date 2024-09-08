import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true },
  isbn: { type: String, required: true }
}, {
  collection: 'book',
  autoIndex: true,
  timestamps: false
})

export interface Book extends mongoose.Document {
  title: string
  author: string
  isbn: string
}

export const bookModel = mongoose.model<Book>('book', schema)

// ------------------------------

export async function connectToDb() {
  const connectionString = process.env.DB_CONN_STRING as string

  await mongoose.connect(connectionString)

  const state = mongoose.connection.readyState
  console.log(`DB Status: ${mongoose.STATES[state]}`)
}