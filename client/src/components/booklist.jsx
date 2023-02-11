import React,{useState} from "react";
import Login from "./authentication/login";
import Register from "./authentication/register";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./home/home";
export default  function Booklist(){
    const[token,setToken]=useState()
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login setToken={setToken}/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<Home token={token} setToken={setToken}/>}/>
        </Routes>
        </BrowserRouter>
    )
}