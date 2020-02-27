"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const optionsDB = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
};
mongoose_1.default.connect(config_1.default.DB.URI, optionsDB);
const connection = mongoose_1.default.connection;
connection.once("open", () => {
    console.log("DB connected");
});
connection.on("error", (err) => {
    console.error(err);
    process.exit(0);
});
