const express= require("express")
const app=express();
const authRoutes=require('./routes/auth.routes')
const cookieParser=require('cookie-parser')



app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)



app.get("/",(req,res)=>{
    res.status(200).json({
        message:"HOME PAGE FETCHED"
    })
})


module.exports=app;