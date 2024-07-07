import express from "express";
import RideController from '../controllers/rideController.js'
const rideRouter = express.Router();
const rideController = new RideController();

rideRouter.get("/waitingForPrice",rideController.waitingForPrice )
rideRouter.get("/waitingForDriver",rideController.waitingForDriver )
rideRouter.get("/acceptedRequests/:id",rideController.acceptedRequests )

export {
    rideRouter 
}