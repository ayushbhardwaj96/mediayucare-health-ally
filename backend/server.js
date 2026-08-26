import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Instituional DNS bypass active rakhenge

import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import express from "express";
import cors from "cors";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();

dotenv.config({
    path: './.env'
}); 

// middlewares

app.use(cors());
app.use(express.json());

// api endpoints 
app.use('/api/admin',adminRouter)
// localhost:4000/api/admin/add-doctor
app.use('/api/doctor', doctorRouter)

app.use('/api/user', userRouter)

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

 