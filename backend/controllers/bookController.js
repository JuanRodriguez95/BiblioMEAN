import book from "../models/book.js";

/**     name:String,
    autor:{type: mongoose.Schema.ObjectId, ref:"authors"},
    pages:Number,
    genre:String,
    registerDate:{type:Date,default:Date.now},
    dbstatus:Boolean*/

const registerBook =async(req,res)=>{
    const {name,author,pages,genre,ISBN}= req.body;

    let bookSchema = new book({
        name:name,
        author:author._id,
        ISBN:ISBN,
        pages:pages,
        genre:genre,
        rating:0,
        dbStatus:true
    });

    const result = await bookSchema.save();

    if(!result)
        return res.status(404).send({message: "Failed book register"});

    return res.status(200).send({message:"Success, book register"})

}
const listBooks =async(req,res)=>{
    let booksList = await book.find().populate("author")
    .exec();
    if(booksList.length === 0)
        return res.status(204).send({message: "Not Content"});

    return res.status(200).send({booksList});
}
const deleteBooks=async(req,res)=>{
    
}
const updateBook=async(req,res)=>{
    
}

export default {registerBook,listBooks}