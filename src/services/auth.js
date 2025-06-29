import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import crypto from 'node:crypto';
import { User } from "../db/models/user.js";
import { Session } from "../db/models/session.js";

const createSession = () => ({
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
});


export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email});

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email});

  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const isValidPassword = await bcrypt.compare(payload.password, user.password);

  if (!isValidPassword){
    throw createHttpError(401, 'Invalid email or password');
  }

  await Session.findOneAndDelete({userId: user._id});

  const session = await Session.create({
    userId: user._id,
    ...createSession(),
  });

  return session;
};