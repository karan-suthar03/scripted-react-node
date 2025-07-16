import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req,res,next)=>{
    console.log("Request:", req.method, req.path,req.body);
    next();
})

app.use("/api/users", userRoutes);
app.use("/api/story", storyRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
