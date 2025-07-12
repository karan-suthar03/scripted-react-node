import dotenv from "dotenv";
dotenv.config();

import app from './app.js';
import prisma from "./config/prisma.js";

try {
  await prisma.$connect();
  console.log('🚀 Prisma connected to PostgreSQL successfully');
} catch (error) {
  console.error('❌ Failed to connect to database:', error);
  process.exit(1);
}

const PORT = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
