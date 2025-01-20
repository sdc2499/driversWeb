import express from "express";
import DriverController from "../controllers/driverController.js";

const driverRouter=express.Router();
const driverController = new DriverController();

driverRouter.get("/:id",driverController.getDriverById);
driverRouter.get("/:id/ratings",driverController.getDriverRate);
driverRouter.get("/mainDetails/:id",driverController.getMainDetails)
driverRouter.get("/",driverController.getDrivers)
driverRouter.post("/rating",driverController.rating)
driverRouter.put("/:id",driverController.updateDriverById);

export {
    driverRouter 
}