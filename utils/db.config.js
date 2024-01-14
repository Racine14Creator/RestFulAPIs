import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({ path: '../.env' })

const DB_URL = process.env.MONGO

const dbConnection = () => {
    mongoose.connect(DB_URL)
        .then(_ => {
            console.log("Connected to MongDB database")
        })
        .catch(error => console.log("MongoDB connection failed", error))
}
export default dbConnection