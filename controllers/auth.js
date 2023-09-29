const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


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
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Submit your data carefully!"
        })
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User is not registered!Sign Up first!"
        })
    }

    if(await bcrypt.compare(password,user.password)){

    }else{
        
    }
}