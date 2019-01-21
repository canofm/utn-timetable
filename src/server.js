import express from "express";
import bodyParser from "body-parser";
import { connect } from "./db";
import { router } from "./api";
import config from "./config";

const app = express();
app.use(bodyParser.urlencodeed({ extended: true }));
app.use(bodyParser.json());

/* connecting to mongodb */
connect();

app.use(config.api.baseUri, router);

export default app;
