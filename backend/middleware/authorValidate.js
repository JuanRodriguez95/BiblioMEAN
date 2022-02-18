import author from "../models/author.js";

/**
 * name:String,
 * codigo:String,
    biography:String,
    age:Number,
    registerDate:{type:Date,default:Date.now},
    dbStatus:Boolean
 */

const existingAuthor = async(req,res,next)=>{
    const{name,biography,age}=req.body;
    if(!name || !biography || !age )
        return res.status(500).send({message: "Incomplete Data"});

    const authorEx = await author.findOne({name: new RegExp(name)});
    if(authorEx)
        return res.status(400).send({message:"The Author is already registered"});
    next();
}

export default {existingAuthor}