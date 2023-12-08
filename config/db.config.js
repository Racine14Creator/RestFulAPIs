import mongoose from "mongoose"
import * as dotenv from "dotenv"

dotenv.config({ path: '../.env' })

const DBConnection = async () => {
    try {
        const connection = await mongoose.createConnection(process.env.MONGO)
        if (connection) { console.log("Connected to mongoDB") } else { console.log("Connection failed"); }
    } catch (error) {
        console.log(error.message)
    }
}

export default DBConnection