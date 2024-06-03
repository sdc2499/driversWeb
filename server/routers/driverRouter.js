import express from "express";
import DriverController from "../controllers/driverController.js";
const driverRouter=express.Router();
const driverController = new DriverController();

driverRouter.get("/:id",driverController.getDriverById);
driverRouter.get("/",driverController.getDrivers)
driverRouter.post("/",driverController.addDriver)
driverRouter.put("/:id",driverController.updateDriverById);

export {
    driverRouter 
}