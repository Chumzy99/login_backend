import { Request, Response, NextFunction } from 'express';
import UserData from '../models/userModel';

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
    res.status(400).json({ error });
  }
};
