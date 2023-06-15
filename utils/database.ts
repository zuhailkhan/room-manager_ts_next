import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log('MongoDB is connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: "hms_db"
        } as mongoose.ConnectOptions)
        .then(() => {
            isConnected = true
            console.log('MongoDB is connected')
            return isConnected;
        })
        
    } catch (error) {
        console.error(error)
    }
}