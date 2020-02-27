export default {
  jwtSecret: process.env.JWT_SEC || "SECRETTTOKEN",
  DB: {
    URI: process.env.DB_STRING || "mongodb://localhost/tsc-jwt-tut",
    USER: process.env.MONGODB_USER || "",
    PASSWORD: process.env.MONGODB_PASS || ""
  }
};
