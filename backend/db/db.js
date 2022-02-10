import mongoose from "mongoose";

const db_connection = () =>{
    try {
        //console.log(process.env.DB_CONNECTION);
        mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Success Connection with MongoDB :  OK");
    } catch (e) {
        console.log("Error connecting with MongoDB: \n",e);
    }
};

export default { db_connection }