import mongoose from "mongoose";
import config from "../config";

const bluebird = require("bluebird");
mongoose.Promise = bluebird;

export const removeModel = modelName => {
  const model = mongoose.model(modelName);
  if (!model) bluebird.resolve();
  model.remove();
};

export const cleanDb = () => {
  return mongoose
    .connect(
      config.db.url,
      { useNewUrlParser: true }
    )
    .then(() => bluebird.all(mongoose.modelNames().map(removeModel)));
};
