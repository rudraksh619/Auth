"use client"
import axios from "axios"
import { useRouter } from "next/navigation";


export default  function ShowProfile(){

    const router = useRouter();
    

 const getuserdetails = async() =>{
    const user =  await axios.get('/api/users/Me')
    console.log("user details" , user.data.data);
 }

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
onClick={getuserdetails}
className="p-3 rounded-2xl border  hover:bg-pink-400 text-red-600">
    Get User Details
</button>
<button 
onClick={getlogout}
className="border p-4 rounded-2xl text-fuchsia-400 bg-black">
    Logout
</button>
</div>
    )
}