import express from "express";
import CostumerController from "../controllers/costumerController.js"
const costumerRouter=express.Router();
const costumerController = new CostumerController();

costumerRouter.put("/:id",costumerController.updateDriverById);

export {
    costumerRouter 
}