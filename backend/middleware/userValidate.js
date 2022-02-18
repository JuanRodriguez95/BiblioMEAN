import user from "../models/user.js";


const userValidator = async(req, res, next) =>{
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.address || !req.body.phone){
        return res.status(400).send({message: "Incomplete Data"});
    }

    const existingUser = await user.findOne( {email: req.body.email} );
    
    if(existingUser)
        return res.status(409).send({message:"the user is already been registred in the database"});

    next();
}

export default {userValidator}