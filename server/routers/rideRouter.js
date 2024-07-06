import express from "express";
import RideController from '../controllers/rideController.js'
const rideRouter = express.Router();
const rideController = new RideController();
//fljngae
// rideRouter.post("/booking",rideController.booking )
rideRouter.get("/waitingForPrice",rideController.waitingForPrice )
rideRouter.get("/waitingForDriver",rideController.waitingForDriver )
rideRouter.get("/acceptedRequests/:id",rideController.acceptedRequests )


export {
    rideRouter 
}