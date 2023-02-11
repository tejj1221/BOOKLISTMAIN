import React,{useState} from "react"
import {Link,useNavigate} from "react-router-dom"

export default function Register(){
    const nav=useNavigate()
    const [form,setform]=useState({})
    const handler=(e)=>{
        e.preventDefault()
        if(form.password!=form.confirmpassword){
            alert("password mismatching")
        }else{
        fetch("https://booklistbackend-skgn.vercel.app/register",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "content-Type":"application/json"
            },
            body:JSON.stringify({email:form.email,password:form.password})
        }).then(x=>x.json()).then(y=>{
            if(y.status=="success"){
               nav("/")
            }
            else{
                alert(y.message)
            }
        })}
    }
    return (
        <div className="container">
            <form onSubmit={handler}>
           <h1>Register</h1>
           <label>username</label>
           <input  required type="email" placeholder="enter email address" onChange={e=>setform({...form,email:e.target.value})}/>
           <label>password</label>
           <input  required type="password" placeholder="******" onChange={e=>setform({...form,password:e.target.value})}/>
           <label>confirm password</label>
           <input  required type="password" placeholder="******" onChange={e=>setform({...form,confirmpassword:e.target.value})}/>
           <button type="submit">Register</button>
           Do have an account?<Link to="/">SignIn</Link>
            </form>
        </div>
    )
}