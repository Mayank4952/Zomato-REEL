const userModel=require("../models/user.model")
const bcrypt=require('bcryptjs')


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

    return res.status(201).json({
        message:"USER IS CREATED SUCCESSFULLY",
        user:{
            username:user.username,
            email:user.email
        }
    })
}

module.exports={registerUser}