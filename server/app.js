import express from "express";
import cors from "cors";
import 'dotenv/config';
import { entranceRouter } from "./routers/entranceRouter.js";
import { rideRouter } from "./routers/rideRouter.js";
import { driverRouter } from "./routers/driverRouter.js";
const app=express();
app.use(express.json());
app.use(cors());

app.use('/entrance',entranceRouter)
app.use('/ride',rideRouter)
app.use('/drivers',driverRouter)

app.listen(process.env.PORT, () => {
    console.log(`start server port: ${process.env.PORT}`);
})