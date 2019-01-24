import mongoose from "mongoose";
import { connect } from "../db";

const bluebird = require("bluebird");
mongoose.Promise = bluebird;

export const removeModel = modelName => {
  const model = mongoose.model(modelName);
  if (!model) bluebird.resolve();
  model.remove();
};

export const cleanDb = () => {
  return connect().then(() => bluebird.all(mongoose.modelNames().map(removeModel)));
};
