// Imported Modules
import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";

// Imported Middleware
import passportMiddleware from "./middlewares/passport";

// Imported Routes
import specialRoutes from "./routes/special.routes";
import authRoutes from "./routes/auth.routes";

// init
const app = express();

//set
app.set("port", process.env.PORT || 3000);

// mid
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

//routers
app.get("/", (req, res) => {
  res.send(`The API is at http://localhost:${app.get("port")}`);
});
app.use(authRoutes);
app.use(specialRoutes);

export default app;
