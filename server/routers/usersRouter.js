import express from "express";
import CostumerController from "../controllers/costumerController.js"
const usersRouter=express.Router();
const costumerController = new CostumerController();

usersRouter.get("/",costumerController.getUserByParam)
// usersRouter.put("/:id",costumerController.updateDriverById);

export {
    usersRouter 
}