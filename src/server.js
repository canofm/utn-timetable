import express from "express";
import bodyParser from "body-parser";
import { connect } from "./db";
import { router } from "./api";
import config from "./config";
import PrettyError from "pretty-error";

const app = express();
app.use(bodyParser.urlencodeed({ extended: true }));
app.use(bodyParser.json());

/* connecting to mongodb */
connect();

new PrettyError().start();
app.use(config.api.baseUri, router);

export default app;

process.on("uncaughtException", err => {
  console.error(err.stack);
});
