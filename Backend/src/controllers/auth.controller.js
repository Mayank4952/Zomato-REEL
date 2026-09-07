const userModel=require("../models/user.model")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


async function registerUser(req,res){
    const {username,email,password}=req.body;
    const isUserExist=await userModel.findOne({
        email
    })
    if(isUserExist) return res.status(409).json({
        message:"USER ALREADY EXISTS"
    })
    const hash=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,email,
        password:hash
    })
    const token =jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)
    
    res.cookie("jwt_token",token)

    return res.status(201).json({
        message:"USER IS CREATED SUCCESSFULLY",
        user:{
            username:user.username,
            email:user.email
        }
    })
}

async function loginUser(req,res){
    const {email,password}=req.body
    const isUserExist=await userModel.findOne({
        email
    })
    if(!isUserExist) return res.status(401).json({message:"USER DOESNT EXIST"})
    const isPasswordCorrect= await bcrypt.compare(password,isUserExist.password)
    if(!isPasswordCorrect){
        return res.status(401).json({message:"wrong password"
        })
    }

    const token=jwt.sign({
        id:isUserExist._id
    },process.env.JWT_SECRET)
    
    res.cookie("jwt_token",token)
    return res.status(200).json({
        message:"LOGIN SUCCESSFUL",
        user:{
            username:isUserExist.username,
            email:isUserExist.email
        }
    })
}


async function logoutUser(req,res){
    res.clearCookie("jwt_token")
    res.status(200).json({
        message:"LOGGED OUT SUCCESSFULLY"
    })
}

module.exports={registerUser,loginUser,logoutUser}