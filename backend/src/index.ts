import dotenv from "dotenv";
dotenv.config();

import app from './app.js';
import connectDB from "./config/db.js";

await connectDB();

const PORT: number = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
