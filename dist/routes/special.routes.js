"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.get("/special", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    res.status(200).json({ status: "Accediendo a ruta protegida" });
});
exports.default = router;
