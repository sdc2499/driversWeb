import express from "express";
import RideController from '../controllers/rideController.js'
const rideRouter = express.Router();
const rideController = new RideController();
//fljngae
// rideRouter.post("/booking",rideController.booking )

export {
    rideRouter 
}