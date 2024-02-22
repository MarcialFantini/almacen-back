import express, { Request, Response } from "express";
import dotenv from "dotenv";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
console.log("hola");
