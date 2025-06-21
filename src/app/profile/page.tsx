"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default  function ShowProfile(){

    const router = useRouter();
    const[user,setuser] = useState();



  async function getlogout(){
        try {
            const response = await axios.get('/api/users/logout')
            router.push('/login');
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    return (
<div className="flex gap-4 flex-col justify-center h-screen items-center">
<div>
    Profile 
</div>
<button 
onClick={getlogout}
className="border p-4 rounded-2xl text-fuchsia-400 bg-black">
    Logout
</button>
</div>
    )
}