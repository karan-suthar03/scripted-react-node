import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
