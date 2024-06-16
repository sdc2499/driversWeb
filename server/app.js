import express from "express";
import cors from "cors";
import 'dotenv/config';
import { authMiddleware } from "./middleware/authMiddleware.js";
import { logErrors } from "./middleware/logError.js";
import { entranceRouter } from "./routers/entranceRouter.js";
import { rideRouter } from "./routers/rideRouter.js";
import { driverRouter } from "./routers/driverRouter.js";
import { usersRouter } from "./routers/usersRouter.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/entrance', entranceRouter);
app.use('/users', usersRouter);
app.use(authMiddleware);
app.use('/ride', rideRouter);
app.use('/drivers', driverRouter);
app.use(logErrors);

export default app;