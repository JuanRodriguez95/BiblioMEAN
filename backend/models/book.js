import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name:String,
    autor:String,
    pages:Number,
    genre:String,
    rating:Number,
    registerDate:{type:Date,default:Date.now},
    dbstatus:true
})

const book = mongoose.model("books",bookSchema);
export default book;