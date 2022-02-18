import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name:String,
    author:{type: mongoose.Schema.ObjectId, ref:"authors"},
    pages:Number,
    ISBN:String,
    genre:String,
    rating:Number,
    registerDate:{type:Date,default:Date.now},
    dbstatus:Boolean
})

const book = mongoose.model("books",bookSchema);
export default book;