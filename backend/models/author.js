import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name:String,
    biography:String,
    age:Number,
    registerDate:{type:Date,default:Date.now},
    dbStatus:Boolean
})

const author = mongoose.model("authors",authorSchema);

export default author;