require("@babel/register");
require("@babel/polyfill");
import http from "http";
import app from "./server";
import config from "./config";

const server = http.createServer(app);

server.listen(
  config.port,
  () => console.log(`Server listing on port ${config.port}`) /* eslint-disable-line no-console */
);
