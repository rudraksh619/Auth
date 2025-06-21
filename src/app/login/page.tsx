"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
export default function Login()
{
    const[user,setuser] = useState({
        email:"",
        password : "",
    }) 

    const[isloading,setisloading] = useState(false);
    const[buttondisabled,setbuttondisabled] = useState(true);
    const router = useRouter();
    const onlogin = async () => {
     try {
      setisloading(true);
      const responsee = await axios.post('api/users/login',user);
      console.log(responsee);
      toast.success("login Succesfully");
      router.push('/profile')
                                                                                                       
     } catch (error) {
      console.log("error durin login",error);
     }
     finally{
      setisloading(false);

     }
    }

    useEffect(()=>{
      if(user.email.length>0 && user.password.length > 0)
      {
        setbuttondisabled(false);
      }
      else{
        setbuttondisabled(true);
      }
    },[user])
   
      return (
        <div className="flex justify-center 
        items-center h-screen w-full flex-col
        ">
                    <div><Toaster
            position="top-right"
            reverseOrder={false}
          /></div>
          <h1>Login</h1>
          <br />
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
           onClick={onlogin}
           disabled = {buttondisabled}
           >{isloading ? "Processing":"Login"}</button>
           <div className="flex gap-3 justify-center items-center m-5">
             <p> Create an account :</p>
             <Link href="/signup" className="text-violet-500">Signup</Link>
           </div>
          

        </div>
      )


}