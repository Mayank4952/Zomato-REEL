const foodModel=require("../models/food.model")
const foodPartnerModel=require("../models/foodpartner.model")
const likeModel=require("../models/like.model")
const saveModel=require("../models/save.model")
const storageService=require("../services/stotage.service")
const {v4:uuid}=require("uuid")

async function createFood(req,res){

    const fileUploadResult=await storageService.uploadFile(req.file.buffer,uuid())

    const foodItem=await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
    })

    res.status(201).json({
        message:"food item created successfully",
        food:foodItem
    })
}

async function getFoodItems(req,res){
    const foodItems= await foodModel.find({})
    res.status(200).json({
        messsage:"FOOD ITEMS FETCHED SUCCESSFULLY",
        foodItems
    })
}

async function likeFood(req,res){
    const {foodId}=req.body
    const user=req.user
    const isAlreadyLiked= await likeModel.findOne({
        user:user._id,
        food:foodId
    })
    if(isAlreadyLiked){
        await likeModel.deleteOne({
            user:user._id,
            food:foodId
        })
        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{likeCount:-1}
        })
        return res.status(200).json({
            message:"FOOD UNLIKED SUCCESSFULLY",
            like:null
        })
    }
    const like=await likeModel.create({
        user:user._id,
        food:foodId
    })
    await foodModel.findByIdAndUpdate(foodId,{
            $inc:{likeCount:1}
        })
    res.status(201).json({
        message:"FOOD LIKED SUCCESSFULLY",
        like
    })
}

async function saveFood(req,res){
     const {foodId}=req.body
    const user=req.user
    const isAlreadySaved= await saveModel.findOne({
        user:user._id,
        food:foodId
    })
    if(isAlreadySaved){
        await saveModel.deleteOne({
            user:user._id,
            food:foodId
        })
          await foodModel.findByIdAndUpdate(foodId,{
            $inc:{savesCount:-1}
        })
          return res.status(200).json({
              message:"FOOD UNSAVED SUCCESSFULLY",
              save:null
          })
    }
    const save=await saveModel.create({
        user:user._id,
        food:foodId
    })
      await foodModel.findByIdAndUpdate(foodId,{
            $inc:{savesCount:1}
        })
    res.status(201).json({
        message:"FOOD SAVED SUCCESSFULLY",
        save
    })
}

async function getSavedFood(req,res){
    const user=req.user
    const savedFoods=await saveModel.find({user:user._id}).populate('food')

    res.status(200).json({
        message:"Fetched Saved Foods Successfully",
        savedFoods
    })
}
module.exports={createFood,getFoodItems,likeFood,saveFood,getSavedFood}