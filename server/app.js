import express from "express";
import cors from "cors";
import 'dotenv/config';
import { authMiddleware } from "./middleware/authMiddleware.js";
import { logErrors } from "./middleware/logError.js";
import { entranceRouter } from "./routers/entranceRouter.js";
import { rideRouter } from "./routers/rideRouter.js";
import { driverRouter } from "./routers/driverRouter.js";
import { usersRouter } from "./routers/usersRouter.js";
import { passwordResetRouter } from "./routers/passwordResetRouter.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use('/entrance', entranceRouter);
app.use('/passwordReset', passwordResetRouter);
app.use(authMiddleware);
app.use('/users', usersRouter);
app.use('/rides', rideRouter);
app.use('/drivers', driverRouter);
app.use(logErrors);

export default app;