import mongoose from "mongoose";


export default async function connect()
{
    try {
       await mongoose.connect(process.env.mongo_url!)
      const state =  mongoose.connection;
      state.on('connected', () =>{
        console.log("datbase connected succesfully");
      });
    } catch (error) {
        console.log("something went wrong during connnection with mongo")
        console.log(error);

    }
}