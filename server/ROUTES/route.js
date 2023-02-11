const express=require('express')
const user=require("../schema/user")
const userdata=require("../schema/userdata")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const route=express.Router()
const secret="siva"
module.exports=route
route.get("/",async(req,res)=>{
    res.status(200).json({
        message:"success kjhgfds"
    })
})
route.get("/login",async(req,res)=>{
    try{
        const check= await user.findOne({email:req.body.email})
        if(check){
             bcrypt.compare(req.body.password,check.password,async function(err,result){
                if(err){
                    return res.status(400).json({
                        status:"error",
                        message:err.message
                    })
                }else{
                    if(!result){
                        return res.status(400).json({
                            status:"error",
                            message:"password and user id not matched"
                        })
                    }else{
                       const token=jwt.sign({
                         exp:Math.floor(Date.now()/1000)+(60*60),
                         data:check._id
                       },secret)
                       return res.status(200).json({
                        status:"success",
                        message:"user authenticated",
                        token
                       })
                    }
                }
             })
        }else{
            return res.status(400).json({
                status:"error",
                message:"user not reqistered"
            })  
        }
    }
    catch(e){
         return res.status(400).json({
            message:e.message,
            status:"error"
         })
    }
})

route.post("/register",async(req,res)=>{
    try{
        const check= await user.findOne({email:req.body.email})
        if(!check){
             bcrypt.hash(req.body.password,10,async function(err,hash){
                if(err){
                    return res.status(400).json({
                        status:"error",
                        message:err.message
                    })
                }
                else{
                    await user.create({email:req.body.email,password:hash})
                    return res.status(200).json({
                        status:"success",
                        message:"user registered successfully",
                       })  

                }
             })
        }else{
            return res.status(400).json({
                status:"error",
                message:"user is already registered"
            })  
        }
    }
    catch(e){
         return res.status(400).json({
            message:e.message,
            status:"error"
         })
    }
})

route.post("/book",async(req,res)=>{
    try{
        jwt.verify(req.headers.authorization,secret,async function(err,decoded){
            if(err){
                return res.status(400).json({
                    message:e.message,
                    status:"error"
                 })
            }else{
               const check=await user.findOne({_id:decoded.data})
               //if checked then valid user
               if(check){
                     const book=await userdata.create({id:decoded.data,...req.body})
                     return res.status(200).json({
                        status:"success",
                        message:"added book successfully",
                        book
                       })  

               }else{
                return res.status(400).json({
                    message:e.message,
                    status:"token not matching"
                 })
               }
            }
        })

    }catch(e){
        return res.status(400).json({
            message:e.message,
            status:"error"
         })
    }
})

route.get("/book",async(req,res)=>{
    try{
        jwt.verify(req.headers.authorization,secret,async function(err,decoded){
            if(err){
                return res.status(400).json({
                    message:e.message,
                    status:"error"
                 })
            }else{
               const check=await user.findOne({_id:decoded.data})
               //if checked then valid user
               if(check){
                     const data=await userdata.find({id:check._id})
                     return res.status(200).json({
                        status:"success",
                        message:"added book successfully",
                        data
                       })  

               }else{
                return res.status(400).json({
                    message:e.message,
                    status:"token not matching"
                 })
               }
            }
        })

    }catch(e){
        return res.status(400).json({
            message:e.message,
            status:"error"
         })
    }
})


route.put("/book/:id",async(req,res)=>{
    try{
        jwt.verify(req.headers.authorization,secret,async function(err,decoded){
            if(err){
                return res.status(400).json({
                    message:e.message,
                    status:"error"
                 })
            }else{
               const check=await user.findOne({_id:decoded.data})
               //if checked then valid user
               if(check){
                     const data=await userdata.updateOne({_id:req.params.id},req.body)
                     return res.status(200).json({
                        status:"success",
                        message:"updated book successfully",
                        data
                       })  

               }else{
                return res.status(400).json({
                    message:e.message,
                    status:"token not matching"
                 })
               }
            }
        })

    }catch(e){
        return res.status(400).json({
            message:e.message,
            status:"error"
         })
    }
})

route.delete("/book/:id",async(req,res)=>{
    try{
        jwt.verify(req.headers.authorization,secret,async function(err,decoded){
            if(err){
                return res.status(400).json({
                    message:e.message,
                    status:"error"
                 })
            }else{
               const check=await user.findOne({_id:decoded.data})
               //if checked then valid user
               if(check){
                     const data=await userdata.deleteOne({_id:req.params.id})
                     return res.status(200).json({
                        status:"success",
                        message:"deleted book successfully",
                        data
                       })  

               }else{
                return res.status(400).json({
                    message:e.message,
                    status:"token not matching"
                 })
               }
            }
        })

    }catch(e){
        return res.status(400).json({
            message:e.message,
            status:"error"
         })
    }
})