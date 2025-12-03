import express from "express";
import dotenv from "dotenv";
import router from "./routes/Auth.js";

import mongoose from 'mongoose';
import connectDB from './utils/db.js';
import NotesRouter from "./routes/Notes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  credentials:true,
  origin:'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());   // ✅ MOST IMPORTANT (fix req.cookies undefined)

app.use('/auth',router)
app.use('/notes',NotesRouter);

// Simple test route
app.get("/", (req, res) => {
  res.send(" Backend server is running...");
});

const PORT = Number(process.env.PORT)||5000;


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
