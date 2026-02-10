import { Router } from "express";
import { isAuth } from "../middlewares/auth";
import { generate } from "../controllers/generate";


const generateRouter = Router();

generateRouter.post("/resume",isAuth,generate);

export default generateRouter;