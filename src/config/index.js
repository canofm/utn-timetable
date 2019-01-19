import { merge } from "lodash";

const env = process.env.NODE_ENV || "development";

const baseConfig = {
  port: process.env.PORT || 3000,
  db: {
    url: "mongodb://localhost/timetable"
  },
  api: {
    baseUri: "/api/v0"
  }
};

let envConfig = {};

switch (env) {
  case "development":
  case "dev":
    envConfig = require("./dev").config;
    break;
  case "prod":
  case "production":
    envConfig = require("./prod").config;
    break;
  default:
    envConfig = require("./dev").config;
}

export default merge(baseConfig, envConfig);
