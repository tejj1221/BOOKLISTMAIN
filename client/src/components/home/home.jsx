import React,{useState} from "react";
import { useEffect } from "react";
import SendHome from "./sendhome";
export default function Home(props){
    const{token,setToken}=props
    const [data,setdata]=useState([{title:"",author:"",description:""}])
    useEffect(()=>{
        fetch("https://booklistbackend-skgn.vercel.app/book",{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "content-Type":"application/json",
                "Authorization":token
            }
        }).then(x=>x.json()).then(y=>setdata(y.data))
    },[])
    return(
        <SendHome data={data} setdata={setdata} token ={token} setToken={setToken}/>
    )
    
}  
