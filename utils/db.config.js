import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({ path: '../.env' })

const DB_URL = "mongodb://127.0.0.1:27017/admin"

const dbConnection = () => {
    mongoose.connect(DB_URL)
        .then(_ => {
            console.log("Connected to MongDB database")
        })
        .catch(error => console.log("MongoDB connection failed"))
}
export default dbConnection