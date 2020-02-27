import mongoose, { ConnectionOptions } from "mongoose";
import config from "./config/config";

const optionsDB: ConnectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
};

mongoose.connect(config.DB.URI, optionsDB);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB connected");
});

connection.on("error", (err) => {
  console.error(err);
  process.exit(0);
});
