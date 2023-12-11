import app from "./app.js";
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";

import UserRouter from "./routes/user.routes.js"
import dbConnection from "./utils/db.config.js";
dotenv.config({ path: ".env" })

const PORT = process.env.PORT || 7001

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
    res.json({ data: "API" })
})

app.use('/users', UserRouter)

const Server = () => {
    dbConnection()
    app.listen(PORT, (error) => {
        if (error) throw error
        console.log(`Server is running on PORT: ${PORT}`)
    })
}
Server()