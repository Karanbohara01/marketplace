import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import path from "path";

import { connectDB } from "./lib/db.js";

import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  // console.log("MongoDB URI:", process.env.MONGODB_URI);

  connectDB();
});
