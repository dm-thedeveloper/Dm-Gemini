import { dbName } from '@/constants'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''
const ConnectToMongoDB = async () => {
  try {
    const response = await mongoose.connect(`${MONGODB_URI}/${dbName}`)
    // console.log('Connected to MongoDB', response.connection)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default ConnectToMongoDB
