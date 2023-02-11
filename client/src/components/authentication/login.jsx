import React,{useState} from "react"
import {Link,useNavigate} from "react-router-dom"

export default function Login(props){
    const{setToken}=props
    const nav=useNavigate()
    const [form,setform]=useState({})
    const handler=(e)=>{
        e.preventDefault()
        fetch("https://booklistbackend-skgn.vercel.app/login",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "content-Type":"application/json"
            },
            body:JSON.stringify(form)
        }).then(x=>x.json()).then(y=>{
            if(y.status=="success"){
                setToken(y.token)
               nav("/home")
            }
            else{
                alert(y.message)
            }
        })
    }
    return (
        <div className="container">
            <form onSubmit={handler}>
           <h1>Login</h1>
           <label>username</label>
           <input  required type="email" placeholder="enter email address" onChange={e=>setform({...form,email:e.target.value})}/>
           <label>password</label>
           <input  required type="password"  placeholder="******" onChange={e=>setform({...form,password:e.target.value})}/>
           <button type="submit">Login</button>
           Didn't have an account ?<Link to="/register">signUp</Link>
            </form>
        </div>
    )
}