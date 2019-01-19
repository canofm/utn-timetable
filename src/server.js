import express from "express";
import bodyParser from "body-parser";
import { connect } from "./db";

const app = express();
app.use(bodyParser.urlencodeed({ extended: true }));
app.use(bodyParser.json());
connect();

export default app;
