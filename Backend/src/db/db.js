const mongoose=require('mongoose')
const dns=require("node:dns")

dns.setServers(["8.8.8.8","8.8.0.0"])

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB CONNECTED SUCCESSFULLY");
    }
    catch(err){
          console.log(`DB CONNECTION FAILED DUE TO ${err}`)
    }
}

module.exports=connectDB