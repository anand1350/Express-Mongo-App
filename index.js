import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users-router.js";
import multer from "multer";
import { nanoid } from "nanoid";

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const filename = nanoid();
        const splittedPath = file.originalname.split(".");
        const fileExtention = splittedPath[splittedPath.length - 1];
        cb(null, `${fileName}.${file.originalname.split('.')}`);
    },
});

const upload = multer({dest: "uploads"})

const PORT = 8080;
const MONGO_CONNECTION_STRING =
    "mongodb+srv://sample:vaoJs1ZuZCHeTs2d@atlascluster.qjeolkt.mongodb.net/green";


mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Could not connect to MongoDB", err);
    });

const app = express();
app.use (express.json());

app.use("/api/users", userRouter)

app.post("/files", upload.single("image"), (req, res) => {
  res.json(req.file);
});

app.use("/static", express.static("uploads"));

app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
});


