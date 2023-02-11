import React,{useState}from "react";
import Bookholder from "./bookholder";
import { useNavigate } from "react-router-dom";

export default function SendHome(props){
     const nav=useNavigate()
     const{data,setdata,token,setToken}=props
     const [upbook,setupbook]=useState({})
     const [specific,setspecific]=useState({})
     const [addform,setaddform]=useState({})
     const [add,setadd]=useState(false)
     const [edit,setedit]=useState(false)
     const[editform,seteditform]=useState({})

     const addbooktolist=(e)=>{
        e.preventDefault()
        fetch("https://booklistbackend-skgn.vercel.app/book",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify(addform)
        }).then(x=>x.json()).then(y=>{
                if(y.status=="success"){
                    alert("book added")
                    setdata([...data,y.book])
                    setadd(false)
                }
        })
            
     }
     const addbook=()=>{
        if(add){
            return(
                <div className="hidden">
               <button onClick={()=>setadd(!add)}>show booklist</button>
               <form onSubmit={addbooktolist}>
                    <h1>add a new book</h1>
                    <h3>create a new book</h3>
                    <input type="text" placeholder="title of book" required onChange={(e)=>setaddform({...addform,title:e.target.value})}/>
                    <input type="text" placeholder="ISBN"onChange={(e)=>setaddform({...addform,isbn:e.target.value})}/>
                    <input type="text" placeholder="author" required onChange={(e)=>setaddform({...addform,author:e.target.value})}/>
                    <input type="text" placeholder="describe the book" required onChange={(e)=>setaddform({...addform,description:e.target.value})}/>
                    <input type="text" placeholder="published_date" required onChange={(e)=>setaddform({...addform,publishedDate:e.target.value})}/>
                    <input type="text" placeholder="publisher" required onChange={(e)=>setaddform({...addform,publisher:e.target.value})}/>
                    <button type="submit">Submit</button>
               </form>
                </div>
            )
        }
     }

     const deletebook=()=>{
        fetch(`https://booklistbackend-skgn.vercel.app/book/${specific._id}`,{
            method:"DELETE",
            headers:{
                "Accept":"application/json",
                "content-Type":"application/json",
                "Authorization":token
            }
        }).then(x=>x.json()).then(y=>{
                if(y.status=="success"){
                    let arr=data
                    for(let i=0;i<arr.length;i++){
                        if(arr[i]._id==specific._id){
                            arr=arr.slice(0,i).concat(arr.slice(i+1,arr.length))
                            setdata(arr)
                            setupbook(!upbook)
                            break;
                        }
                    }
                }
        })
     }

     const updatelist=(e)=>{
        e.preventDefault()
        fetch(`https://booklistbackend-skgn.vercel.app/book/${specific._id}`,{
            method:"DELETE",
            headers:{
                "Accept":"application/json",
                "content-Type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify(editform)
        }).then(x=>x.json()).then(y=>{
                if(y.status=="success"){
                for(let i in editform){
                    specific[i]=editform[i]

                }
                alert("updated data")
                setedit(!edit)
                }
        })
     }

     const editbook=()=>{
           return(
            <div className="hidden">
            <button onClick={()=>setedit(!edit)}>show booklist</button>
            <form onSubmit={updatelist}>
                 <h1>edit book</h1>
                 <h3>update  book</h3>
                 <input type="text" placeholder="title of book" required onChange={(e)=>seteditform({...editform,title:e.target.value})}/>
                 <input type="text" placeholder="ISBN"onChange={(e)=>seteditform({...editform,isbn:e.target.value})}/>
                 <input type="text" placeholder="author" required onChange={(e)=>seteditform({...editform,author:e.target.value})}/>
                 <input type="text" placeholder="describe the book" required onChange={(e)=>setaddform({...editform,description:e.target.value})}/>
                 <input type="text" placeholder="published_date" required onChange={(e)=>setaddform({...editform,publishedDate:e.target.value})}/>
                 <input type="text" placeholder="publisher" required onChange={(e)=>setaddform({...editform,publisher:e.target.value})}/>
                 <button type="submit">Submit</button>
            </form>
             </div>
           )
     }

     const updatebook=()=>{
        return(
            <div className="hidden">
                <button onClick={()=>setupbook(!upbook)}>show book list</button>
                <h1>books list</h1>
                <h3>view books list</h3>
                <div>
                    <span>1</span><span>Title</span><span>{specific.title}</span>
                </div>
                <div>
                    <span>2</span><span>Author</span><span>{specific.author}</span>
                </div>
                <div>
                    <span>3</span><span>ISBN</span><span>{specific.isbn}</span>
                </div>
                <div>
                    <span>4</span><span>publisher</span><span>{specific.publisher}</span>
                </div>
                <div>
                    <span>5</span><span>publishedDate</span><span>{specific.publishedDate}</span>
                </div>
                <div>
                    <span>6</span><span>Description</span><span>{specific.description}</span>
                </div>
                <div className="hidden-btn">
                  <button onClick={()=>{setupbook(!upbook);setedit(!edit)}}>updatebook</button>
                  <button onClick={()=>{deletebook()}} >Deletebook</button>
                  
                </div>
            </div>
        )
     }
     return(
        <div className="home">
            <h1>booklist</h1>
            <div className="add-btn">
                <button onClick={()=>setadd(!add)} >Add new Book</button>
                <button onClick={()=>{
                    nav("/")
                    setToken("")
                }}>Logout</button>
            </div>
            <Bookholder data={data} setupbook={setupbook} setspecific={setspecific}/>
            {add?addbook():<></>}
            {upbook?updatebook():<></>}
            {edit?editbook():<></>}
        </div>
     )
}