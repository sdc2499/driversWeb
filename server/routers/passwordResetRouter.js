import express from "express";
import PasswordResetController from "../controllers/passwordResetController";
const passwordResetRouter = express.Router();
const passResetController = new PasswordResetController();

passwordResetRouter.post("/passwordReset",passResetController.passwordReset)
passwordResetRouter.post("/passwordUpdate",passResetController.passwordUpdate)

export {
    passwordResetRouter 
}