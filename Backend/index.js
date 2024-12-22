import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// CORS configuration for Netlify frontend and Render backend
const corsOptions = {
  origin: "https://shreyas-chat-app.netlify.app", // Frontend URL (Netlify)
  credentials: true, // Allow cookies to be sent with cross-origin requests
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // Apply CORS with credentials

// Database connection
const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
