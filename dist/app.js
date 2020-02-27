"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imported Modules
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
// Imported Middleware
const passport_2 = __importDefault(require("./middlewares/passport"));
// Imported Routes
const special_routes_1 = __importDefault(require("./routes/special.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// init
const app = express_1.default();
//set
app.set("port", process.env.PORT || 3000);
// mid
app.use(morgan_1.default("tiny"));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
//routers
app.get("/", (req, res) => {
    res.send(`The API is at http://localhost:${app.get("port")}`);
});
app.use(auth_routes_1.default);
app.use(special_routes_1.default);
exports.default = app;
