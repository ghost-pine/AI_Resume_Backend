import { RequestHandler } from "express";
import UserModel from "../models/user";
import resume from "../services/api";
import type { description } from "../services/api";



export const generate:RequestHandler = async ( req,res ) => {
    
    try {
        const { JobTitle,JobDescription } = req.body;

        const { id } = req.user;
        const user = await UserModel.findOne({ _id:id }) as description

        const response = await resume( JobTitle,JobDescription,user );

        if (response) {
            console.log(response)
            res.json(response);
        } else {
            res.status(404).json({ message: "No response from OpenAI." }); 
        }
    } catch(err) {
        console.error("Failed to AI",err);
    }
}