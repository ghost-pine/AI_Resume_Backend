import { Schema,model } from "mongoose";

export const WorkHistoryItem = new Schema({
    Company: {
        type: String,
        required: true,
        trim: true
    },
    StartPeriod: {
        type: String,
        required: true,
        trim: true
    },
    EndPeriod: {
        type: String,
        required: true,
        trim: true
    },
    Number: {
        type: Number,
        required: true
    }
});

export const userSchema = new Schema({
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        enum:["user","author"],
        default:"user",
    },
    profile:{
        Name:{
            type:String,
            trim:true
        },
        Location:{
            type:String,
            trim:true,
        },
        Phonenumber:{
            type:String,
            trim:true,
        },
        Gmail:{
            type:String,
            trim:true,
        },
        Linkdin:{
            type:String,
            trim:true,
        },
        Degree:{
            type:String,
            trim:true,
        },
        University:{
            type:String,
            trim:true,
        },
        StartPeriod:{
            type:String,
            trim:true,
        },
        EndPeriod:{
            type:String,
            trim:true,
        },
        WorkHistory:[WorkHistoryItem]

    }
    
})
const UserModel = model("User",userSchema);

export default UserModel;