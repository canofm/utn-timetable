import mongoose from "mongoose";
import appConfig from "./config";
import * as Promise from "bluebird";

mongoose.Promise = Promise;

export const connect = (config = appConfig) => {
  return mongoose.connect(
    config.db.url,
    {
      useMongoClient: true
    }
  );
};
