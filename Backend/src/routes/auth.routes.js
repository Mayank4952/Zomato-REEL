const express=require("express")
const router=express.Router()
const authController=require('../controllers/auth.controller')
const { route } = require("../app")

//user auth apis
router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)


//food partner apis
router.post('/foodPartner/register',authController.registerFoodPartner)
router.post('/foodPartner/login',authController.loginFoodPartner)
router.get('/foodPartner/logout',authController.logoutFoodPartner)
module.exports=router