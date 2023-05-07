import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log('DB is already connected')
        return;
    }

    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName: 'promptopia',
            useNewUrlparser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log('DB connected')
    } catch (error) {
        console.log('DB connection failed')
        console.log('Error: ', error)
    }

}