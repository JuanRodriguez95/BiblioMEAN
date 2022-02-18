import user from "../models/user.js";
import rol from "../models/role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

import { userValidator } from "../helpers/validator.js";
// import {responseConstructor} from "../helpers/response.js";
import role from "../models/role.js";

const registerUser = async (req, res) => {
  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    address: req.body.address,
    phone: req.body.phone,
    role: req.body.role,
    dbstatus: true,
  });

  const result = await userSchema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register role" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (error) {
    return res.status(500).send({ message: "Register error" });
  }
};

//----------------------------------------------------------------
const listUser = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  if (users.length === 0)
    return res.status(404).send({ message: "No search results" });

  return res.status(200).send({ users });
};

//---------------------------------------------------------

const login = async(req,res)=>{
  const {email,password}=req.body;

  const userLogin = await user.findOne({email: email});
  if(!userLogin)
    return res.status(404).send({message: "Incorrect Email or password"});

  const userDbStatus = await user.findOne({dbstatus:true});
  if(!userDbStatus)
    return res.status(403).send({message: "Disabled user"});

  const passhash = await bcrypt.compare(password,userLogin.password);

  if (!passhash ) 
    return res.status(403).send({message: 'Incorrect Email or password'});

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (error) {
      return res.status(400).send({ message: "Login JWT Error" });
  }
}


export default { registerUser, listUser,login };
