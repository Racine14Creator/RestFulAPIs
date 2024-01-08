import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
// import multer from "multer";
import cloudinary from "cloudinary";
import UserRouter from "./routes/user.routes.js";
import dbConnection from "./utils/db.config.js";

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 7001;
const app = express();

// Use multer before other middleware that parses the request body
// import { upload } from "./controllers/user.controller.js";
// app.use(upload.single('image'));

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
    res.json({ data: "API" });
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
    dbConnection();
    app.listen(PORT, (error) => {
        if (error) throw error;
        console.log(`Server is running on PORT: ${PORT}`);
    });
};

server();
