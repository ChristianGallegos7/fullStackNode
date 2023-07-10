import mongoose from "mongoose";

const user = "7stars";
const password = "7stars";
const dbname = "login";

const uri = `mongodb+srv://${user}:${password}@cluster0.ybhrtcr.mongodb.net/${dbname}?retryWrites=true&w=majority`;
// mongodb+srv://7stars:7stars@cluster0.ybhrtcr.mongodb.net/login?retryWrites=true&w=majority
export const connectDB = async ()=>{
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true, useUnifiedTopology: true })
      console.log(">>>connected to db")
  } catch (error) {
    console.log(error)
  }
   
}