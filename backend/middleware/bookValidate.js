import author from "../models/author.js";
import book from "../models/book.js";

/**     name:String,
    autor:{type: mongoose.Schema.ObjectId, ref:"authors"},
    pages:Number,
    genre:String,
    registerDate:{type:Date,default:Date.now},
    dbstatus:Boolean*/

const existingBook = async(req,res,next)=>{
    const {name,pages,genre,nameAuthor,ISBN}= req.body;
    if(!name || !pages || !genre || !nameAuthor || !ISBN)
        return res.status(404).send({message: "Incomplete Data"});

    const bookR = await book.findOne({ISBN: ISBN});
    if(bookR)
        return res.status(400).send({message:"The ISBN code is already register"})

    const authorR = await author.findOne({name: new RegExp(nameAuthor)});

    if(!authorR)
        return res.status(400).send({message:"registered author does not exist"})

    req.body.author=authorR;

    next();
    
}

export default {existingBook}