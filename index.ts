import { config } from "dotenv";
import express from "express";
import "./src/db/connect";

import cors from "cors";
import authRouter from "./src/routes/auth";
import generateRouter from "./src/routes/generate";

const app = express();
config();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 8989;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/generate", generateRouter);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
