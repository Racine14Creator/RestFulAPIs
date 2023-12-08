import exp from "express";
import cors from "cors";
import fileUpload from "express-fileupload"
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import UserRouter from "./router/User.routes.js";
import dbConnection from "./config/db.config.js";

dotenv.config({ path: `./.env` });

// DB connection
dbConnection();

const app = exp();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(exp.json());
app.use(exp.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use("/api", UserRouter)

// Routers
app.get("/", (request, response) => {
    response.json({ message: "api" })
})

const Server = () => {
    app.listen(PORT, (error) => {
        if (error) throw error.message
        console.log(`Server run on PORT: http://localhost:${PORT}`)
    })
}
Server()