const mongoose=require('mongoose')
const schema=mongoose.Schema
const Blogschema=new schema({
   email:{type:String,reqiured:true,unique:true},
   password:{type:String}
})
const user=mongoose.model("booklistuser",Blogschema)
module.exports=user
