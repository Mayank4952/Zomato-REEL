const express=require("express")
const router=express.Router()
const foodPartnerController=require('../controllers/foodPartner.controller')
const authMiddleware=require('../middlewares/auth.middleware')

router.get('/:id',authMiddleware.authUserMiddleware,foodPartnerController.getFoodPartnerById)
 
module.exports=router