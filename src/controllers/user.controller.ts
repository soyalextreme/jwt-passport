import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

//MODELS
import UserClient, { IClient } from "../models/UserClient";

function createToken(user: IClient) {
  return jwt.sign({ _id: user._id }, config.jwtSecret, {
    expiresIn: 60 * 60 * 24
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password)
    return res.status(404).json({ status: "missing information" });
  const _notUnique = await UserClient.findOne({ email: req.body.email });
  if (_notUnique) return res.status(404).json({ status: "Usuario ya existe" });
  let dataClient = {
    email: req.body.email,
    password: req.body.password
  };
  const newUserClient: IClient = new UserClient(dataClient);
  await newUserClient.save();
  return res
    .status(201)
    .json({ status: `User Register: ${newUserClient.email}` });
};

export const signIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password)
    return res.status(404).json({ status: "missing information" });
  const userFind = await UserClient.findOne({ email: req.body.email });
  if (!userFind)
    return res.status(403).json({ status: "user already register" });
  const _isValid = await userFind.comparePassword(req.body.password);
  if (_isValid) return res.status(200).json({ token: createToken(userFind) });
  return res.status(402).json({ status: "password invalid" });
};
