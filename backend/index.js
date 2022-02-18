import express from 'express';
import cors from "cors";
import db from "./db/db.js";
import roleRouters from "./routes/roleRoutes.js";
import userRouters from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/role",roleRouters);
app.use("/api/user",userRouters);
app.use("/api/book",bookRoutes);
app.use("/api/author",authorRoutes);




app.listen(process.env.PORT, ()=> console.log('Backend server running on port : ',process.env.PORT));

db.db_connection();
