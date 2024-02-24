import express from "express";
import dotenv from "dotenv";
import { connect } from "./DB/connection";
import bodyParser from "body-parser";
import { appRouter } from "./routers/appRouter";

connect();

dotenv.config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

appRouter(app);

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});
