import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Instituional DNS bypass active rakhenge

import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import express from "express";
import cors from "cors";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({
    path: './.env'
});

connectDB()
.then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`⚙️ Server is running smoothly at port : ${port}`);
    });
})
.catch((err) => {
    console.log("Crash log during start sequence: ", err);
});

connectCloudinary() ;
