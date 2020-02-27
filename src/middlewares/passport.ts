import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import UserClient from "../models/UserClient";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await UserClient.findById(payload._id);
    if (user) {
      return done(null, user);
    }
    done(null, false);
  } catch (error) {
    console.log(error);
  }
});
