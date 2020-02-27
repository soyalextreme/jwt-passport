"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: process.env.JWT_SEC || "SECRETTTOKEN",
    DB: {
        URI: process.env.DB_STRING || "mongodb://localhost/tsc-jwt-tut",
        USER: process.env.MONGODB_USER || "",
        PASSWORD: process.env.MONGODB_PASS || ""
    }
};
