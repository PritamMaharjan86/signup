import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./Routes/AuthRouter.js";
import "./Models/Database.js";

dotenv.config();

const app = express();
const PORT = 3001;

const corsConfig = {
  origin: "*",
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(bodyParser.json());

app.get("/server", (req, res) => {
  res.send("Server is running now...");
});

app.use("/auth", AuthRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on ${process.env.PORT || PORT}`);
});
