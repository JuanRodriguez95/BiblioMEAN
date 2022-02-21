import book from "../models/book.js";
import authorModel from "../models/author.js"


const registerBook =async(req,res)=>{
    const {name,author,pages,genre,ISBN}= req.body;

    let bookSchema = new book({
        name:name,
        author:author._id,
        ISBN:ISBN,
        pages:pages,
        genre:genre,
        rating:0,
        dbstatus:true
    });

    const result = await bookSchema.save();

    if(!result)
        return res.status(500).send({message: "Failed book register"});

    return res.status(200).send({message:"Success, book register"})

}
const listBooks =async(req,res)=>{
    let booksList = await book.find({name: new RegExp(req.params["name"])}).populate("author")
    .exec();
    if(booksList.length === 0)
        return res.status(204).send({message: "Not Content"});

    return res.status(200).send({booksList});
}


const deleteBooks=async(req,res)=>{
    const{_id}= req.params;
    if(!_id) return res.status(400).send({message:"Invalid Data"});

    const books = await book.findByIdAndUpdate(_id,{
        dbstatus:false
    });

    return !books
    ? res.status(400).send({message:"Deleting Error"})
    : res.status(200).send({message:"Success Deleted"});
}
const updateBook=async(req,res)=>{
    const{_id,name,author,ISBN,pages,genre,rating}=req.body
    if(!_id)
        return res.status(400).send({message: "Incomplete Data"});
    const authorBook = await authorModel.findOne({_id:author});
    if(!authorBook) return res.status(404).send({message: "Author not found"});
    const books = await book.findByIdAndUpdate(_id,{
        name:name,
        author:authorBook,
        ISBN:ISBN,
        pages:pages,
        genre:genre,
        rating:rating 
    });

    return !books
    ? res.status(500).send({message:"Updated Book Error"})
    : res.status(200).send({message:"Success Update"});

}

export default {registerBook,listBooks,deleteBooks,updateBook}
