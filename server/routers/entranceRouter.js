import express from "express";
import entranceController from '../controllers/entranceController.js'
const entranceRouter = express.Router();
const entrController = new entranceController();

entranceRouter.post("/login",entrController.login)
entranceRouter.post("/register",entrController.register)

export {
    entranceRouter 
}