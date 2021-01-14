require("module-alias/register");

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import config from "./config";

import auth from "./routes/auth";
import debug from "./routes/debug";
import filter from "./routes/filter";
import rawData from "./routes/raw-data";
import semesters from "./routes/semesters";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (_req, res) => res.send("Express + TypeScript Server"));

app.use("/auth", auth);

app.use(debug);
app.use(filter);
app.use(rawData);
app.use(semesters);

mongoose.connection.on("error", console.error);

(async () => {
  await mongoose.connect(config.get("mongo_uri"), {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(
    `🐵[database][${new Date().toLocaleTimeString()}]: connected to remote`
  );

  app.listen(config.get("port"), () => {
    console.log(
      `⚡[server][${new Date().toLocaleTimeString()}]:`,
      `running on https://localhost:${config.get("port")}`
    );
  });
})();
