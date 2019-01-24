import mongoose from "mongoose";
import { connect } from "../db";
import "../domain/subject";

const bluebird = require("bluebird");
mongoose.Promise = bluebird;

export const removeModel = modelName => {
  const model = mongoose.model(modelName);
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve();
    }
    model.deleteOne(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const cleanDb = () => {
  return connect().then(() => bluebird.all(mongoose.modelNames().map(removeModel)));
};
