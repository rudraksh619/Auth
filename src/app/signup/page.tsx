"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
export default function Sign_up()
{
    const[user,setuser] = useState({
        email:"",
        username: "",
        password : "",
    })
    const router = useRouter();
    const[buttondisabled, setbuttondisabled] = useState(false);
    const[isloading,setisloading] = useState(false);


    const onSignUp = async () => {
      try {
        setisloading(true);
        console.log(user);
        const response = await axios.post("/api/users/signup",user);
      console.log(response);
       toast.success("signup Succesfully");
      router.push('/login')
     
      } catch (error) {
        setisloading(false)
        console.log("Signing up is not possible : " , error )
        
      } finally{
        setisloading(false);
       

      }
    }
useEffect(()=>{
if(user.email.length > 0 && user.password.length > 0 && 
  user.username.length > 0
)
{
  setbuttondisabled(false);
}
else{
  setbuttondisabled(true);
}
},[user])
    console.log(user.username);
      return (
      
        <div className="flex justify-center 
        items-center h-screen w-full flex-col
        ">
          <div><Toaster
  position="top-right"
  reverseOrder={false}
/></div>
          <h1>{isloading ? "Processing..." : "Sign_Up"}</h1>
          <br />
          <label htmlFor="username">Username</label>
          <input type="text"
          placeholder="username.."
          id="username"
          value={user.username}
          onChange={(e)=>{setuser({...user, username :e.target.value})}}
           className="border rounded-2xl p-2 m-1"/>

            <label htmlFor="email">Email</label>
          <input type="email"
          
          placeholder="email.."
          id="email"
          value={user.email}
          onChange={(e)=>{setuser({...user, email :e.target.value})}}
           className="border rounded-2xl p-2 m-1"/>

            <label htmlFor="password">Password</label>
          <input type="password"
          placeholder="Password.."
          id="password"
          value={user.password}
          onChange={(e)=>{setuser({...user, password :e.target.value})}}
           className="border rounded-2xl p-2 m-1"/>

           <button 
           className="mt-8 border rounded-2xl p-3 "
           disabled = {buttondisabled}
           onClick={onSignUp}
           >{buttondisabled ? "No_Signup":"Sign up"}</button>
           <div className="flex gap-3 justify-center items-center m-5">
             <p>Already have a account :</p>
             <Link href="/login" className="text-violet-500">Login</Link>
           </div>
          

        </div>
      )


}