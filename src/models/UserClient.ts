import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IClient extends Document {
  email: String;
  password: String;
  comparePassword: (password: String) => Promise<Boolean>;
}

const ClientSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

ClientSchema.pre<IClient>("save", async function(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

ClientSchema.methods.comparePassword = async function(
  password: String
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IClient>("Client", ClientSchema);
