const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.signup = async (req,res)=>{
    try{
        const{name,email,password,role} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(500).json({
                success:false,
                message:"User Already Exist",
            })
        }

        // ab new user hetoh uska password hash karo
        let hashedpassword;
        try{
            hashedpassword = await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Passoword is not hashed"
            })
        }

        // create entry in db
        const user = await User.create({
            name,email,password:hashedpassword,role
        })

        return res.status(200).json({
            success:true,
            message:"User Created Successfully!"
        })


    }
    catch(error){   
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"User cannot be registered ,please try again later!"
        })

    }

}


// login controller
exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Submit your data carefully!"
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered!Sign Up first!"
            })
        }
        
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,

        };

        if(await bcrypt.compare(password,user.password)){

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options ={
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User Logged In Successfully!"
            })

        }else{
            return res.status(403).json({
                success:false,
                message:"Incorrect Password!"
            })

        }
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                success:false,
                message:'Login Failure'

            })

        }
}