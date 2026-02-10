import { Router } from "express";
import SignUp, { SignIn } from "../controllers/auth";
import { Profile } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signup",SignUp);
authRouter.post("/signin",SignIn);
authRouter.post("/profile",Profile);


export default authRouter;