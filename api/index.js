import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js';
dotenv.config();

 
const URL = process.env.MONGO_URL;
mongoose.connect(URL)
  .then(() => {
    console.log("mongo db is connected!!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});


app.use('/api/user',userRoutes);