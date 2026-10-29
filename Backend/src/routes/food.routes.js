const express=require('express')
const router=express.Router()
const foodController=require("../controllers/food.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const multer=require("multer")

const upload=multer({
    storage: multer.memoryStorage()
})
router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.single("file"),foodController.createFood)

router.get('/',authMiddleware.authUserMiddleware,foodController.getFoodItems)

module.exports=router