import jwt from "jsonwebtoken";
import { RequestHandler } from "express";


declare global {
  namespace Express {
    export interface Request {
      user: {
        id:string;
      };
    }
  }
}

export const isAuth: RequestHandler = async (req, res, next) => {
  const authtoken:string = req.headers["Authorization"] as string || req.headers["authorization"] as string;

  if (!authtoken) {
    res.json({
      message: "Unauthorized request!"
    });
    return;
  }

    const payload = jwt.verify(authtoken, process.env.JWT_SECRET!) as { id: string };

    req.user = payload;

    next();
};
