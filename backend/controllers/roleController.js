import role from "../models/role.js";
import { responseConstructor } from "../helpers/response.js";

const registerRol = async (req, res) => {
    if (!req.body.name || !req.body.description)
        //return responseConstructor(400,"Incomplete Data")
        return res.status(400).send({ message: "Incomplete data" });

    let schema = new role({
        name: req.body.name,
        description: req.body.description,
        dbstatus: true,
    });

    let result = await schema.save();
    if (!result) {
        console.log(res.status(500).send({ message: "Failed to register role" }));
        return res.status(500).send({ message: "Failed to register role" });
        //return responseConstructor(400,"Failed to register role")
    }
    return res.status(200).send({ result });
};

const listRoles = async (req, res) => {
    console.log(req);
    let roles = await role.find();
    if (roles.length === 0)
        return res.status(404).send({ message: "Data not found" });
    return res.status(200).send({ roles });
};

export default { registerRol, listRoles };
