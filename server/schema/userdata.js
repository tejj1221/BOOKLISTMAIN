const mongoose=require('mongoose')
const schema=mongoose.Schema
const Blogschema=new schema({
      id:{type:String,required:true},
      title:{type:String,required:true},
      author:{type:String,required:true},
      isbn:{type:String},
      publisher:{type:String},
      publishedDate:{type:String},
      description:{type:String,required:true}
})
const userdata=mongoose.model("booklistdata",Blogschema)
module.exports=userdata
