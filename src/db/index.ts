import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL;

if(!url) throw new Error("Database url is missing!");
export const dbconnect = () => {
    mongoose.connect(url)
    .then(() => {
        console.log("DB connected!");
    })
    .catch((error) => {
        console.log("DB connection failed!",error.message)
    })
}
