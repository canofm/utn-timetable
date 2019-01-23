import mongoose from "mongoose";
import appConfig from "./config";

mongoose.Promise = require("bluebird");

export const connect = (config = appConfig) => {
  return mongoose.connect(
    config.db.url,
    { useNewUrlParser: true }
  );
};
