import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import UserRouter from "./routes/user.routes.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv"

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 7001;
const DB_URL = process.env.MONGO

const app = express();

app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 } // Increased the limit to 50 MB
}));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
    res.json({
        "data": [
            { data: "API" },
            {
                endpoints: [{
                    users: "/users",
                    login: "/login"
                }]
            }
        ]
    });
});

app.post('/upload', async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'));
        res.json({ imageUrl: result.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use('/users', UserRouter);

const server = () => {
    mongoose.connect(DB_URL)
        .then(_ => {
            app.listen(PORT, (error) => {
                if (error) return error;
                console.log("Connected to MongDB database")
                console.log(`Server is running on PORT: ${PORT}`);
            });

        })
        .catch(error => console.log("MongoDB connection failed", error))
};

server();
