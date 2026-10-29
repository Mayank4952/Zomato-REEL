const foodPartnerModel=require("../models/foodpartner.model")
const userModel=require("../models/user.model")
const jwt=require('jsonwebtoken')

async function authFoodPartnerMiddleware(req,res,next){
    const token=req.cookies.jwt_token
    if(!token){
        return res.status(401).json({
            message:"PLEASE LOGIN FIRST"
        });
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const partner=await foodPartnerModel.findById(decoded.id)
        req.foodPartner=partner;
        next()
        }
    catch(err){
        return res.status(401).json({
            message:"INVALID TOKEN"
        })
    }
}

async function authUserMiddleware(req,res,next){
    const token=req.cookies.jwt_token;
  if(!token){
        return res.status(401).json({
            message:"PLEASE LOGIN FIRST"
        });
    }

     try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findById(decoded.id)
        req.user=user;
        next()
        }
    catch(err){
        return res.status(401).json({
            message:"INVALID TOKEN"
        })
    }
}

module.exports={authFoodPartnerMiddleware,authUserMiddleware}