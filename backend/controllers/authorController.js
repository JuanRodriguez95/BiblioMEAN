import author from "../models/author.js";

/**
 * name:String,
    biography:String,
    age:Number,
    registerDate:{type:Date,default:Date.now},
    dbStatus:Boolean
 */
//-------------------------------------------------------------------

const registerAuthor = async(req,res)=>{
    const{name,biography,age}=req.body;
    let authorSchema = new author({
        name:name,
        biography:biography,
        age:age,
        dbStatus:true
    })

    const result = await authorSchema.save();

    if(!result)
    return res.status(500).send({ message: "Failed to register Author" });

    return res.status(200).send({message:"Success"});
}

//-------------------------------------------------------------------

const listAuthor= async(req,res)=>{
    let authorsList = await author.find({name: new RegExp(req.params["name"])});
    if(authorsList.length === 0)
        return res.status(204).send({message: "Not Content"});
    return res.status(200).send({authorsList});
}
//-------------------------------------------------------------------
const deleteAuthor = async(req,res)=>{
    const{_id} = req.params;
    if(!_id) return res.status(400).send({message:"Incomplete Data"});

    let authors = await author.findByIdAndUpdate(_id,{
        dbStatus:false
    });

    return !authors
    ? res.status(400).send({ message: "Error deleting author" })
    : res.status(200).send({ message: "Author deleted" }); 
}

//-------------------------------------------------------------------

const updateAuthor = async(req,res)=>{
    const{_id,name,biography,age} = req.body;
    if(!name || !biography || !age)
        return res.status(400).send({message: "Incomplete Data"});
    const authors = await author.findByIdAndUpdate(_id,{
        name:name,
        biography:biography,
        age:age
    });
    return !authors
    ?res.status(400).send({message:"Update Failed"})
    : res.status(200).send({message:"Success Update"});
}

//-------------------------------------------------------------------


export default {registerAuthor,listAuthor,deleteAuthor,updateAuthor}