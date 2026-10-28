const mongoose=require('mongoose')

const foodPartnerSchema=new mongoose.Schema({
     username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const foodPartnerModel=mongoose.model("foodPartner",foodPartnerSchema)

module.exports=foodPartnerModel