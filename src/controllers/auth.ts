import { RequestHandler } from "express";
import UserModel from "../models/user";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";


const profileSchema = Joi.object({
  Name: Joi.string().optional(),
  Location: Joi.string().optional(),
  Phonenumber: Joi.string().optional(),
  Gmail: Joi.string().email().optional(),
  Linkdin: Joi.string().optional(),
  Degree: Joi.string().optional(),
  University: Joi.string().optional(),
  StartPeriod: Joi.string().optional(),
  EndPeriod: Joi.string().optional(),
  WorkHistory: Joi.array().items(Joi.object({
    position: Joi.string().required(),
    company: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().optional()
  })).optional(),
});


const SignUp: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const salt = genSaltSync(10);

  const passwordToken = hashSync(password, salt);
  const newUser = await UserModel.create({
    email: email,
    password: passwordToken,
  });
  res.json({
    message: "User does not exist. A new user has been created.",
  });
};

export default SignUp;

export const SignIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (user) {
    const isPasswordValid = compareSync(password, user.password);
    if (isPasswordValid) {
      // JWT Creation with user info
      const payload = { id: user._id };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "15d",
      });

      res.json({
        success: true,
        accessToken,
      });
    } else {
      res.status(401).json({ message: "Invalid password." });
    }
  } else {
    res.json({
      message: "Please signup first.",
    });
  }
};

export const Profile: RequestHandler = async (req, res) => {
  const { profile,email} = req.body; 
  try {
   const user = await UserModel.findOneAndUpdate(
      { email: email },
      { profile: profile }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({
      saved: "OK"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
}
