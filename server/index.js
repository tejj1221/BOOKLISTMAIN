const express=require("express")
const mongoose=require("mongoose")
const route=require("./ROUTES/route")
const bodyparser=require("body-parser")
const cors=require("cors")
const app=express()
mongoose.connect('mongodb+srv://sivateja:1221@cluster0.uvtchqn.mongodb.net/?retryWrites=true&w=majority',err=>{
if(err){
    console.log("database not connected")
}else{
    console.log("database connected")
}
})
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use("/",route)

const port=process.env.PORT||8080
app.listen(port,console.log(`app is listening at port ${port}`))