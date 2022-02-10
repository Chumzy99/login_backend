import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import UserData from '../models/userModel';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const cookieOptions = {
  expires: new Date(
    Date.now() +
      Number(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000
  ),
  secure: false,
  httpOnly: true,
};

if (process.env.NODE_ENV === 'production') {
  cookieOptions.secure = true;
}

export const signup = async (req: Request, res: Response) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const newUser = await UserData.create(userData);

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'fail', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'fail', error: 'Please provide email and password' });
    }

    const user = await UserData.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .json({ status: 'fail', error: 'Incorrect email or password' });
    }

    const token = signToken(user._id);

    res.cookie('jwt', token, cookieOptions);

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ status: 'fail', error });
  }
};
