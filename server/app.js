import express from "express";
import cors from "cors";
import 'dotenv/config';
import { entranceRouter } from "./routers/entranceRouter.js";

const app=express();
app.use(express.json());
app.use(cors());

app.use('/entrance',entranceRouter)



app.listen(process.env.PORT, () => {
    console.log(`start server port: ${process.env.PORT}`);
})