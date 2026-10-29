const express= require("express")
const app=express();
const authRoutes=require('./routes/auth.routes')
const foodRoutes=require('./routes/food.routes')
const cookieParser=require('cookie-parser')



app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/food',foodRoutes)

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"HOME PAGE FETCHED"
    })
})


module.exports=app;