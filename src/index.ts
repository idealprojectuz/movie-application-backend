import express, { Application } from "express";
import ErrorHandler from "./middleware/error/errorHandle";
import router from "./router";
import { AppDataSource } from "./config/ormconfig";
const app: Application = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
AppDataSource.initialize().catch((err) => console.log(err));
app.use(router);
app.use(ErrorHandler);
app.listen(5000, () => {
  console.log("listening on port " + PORT);
});
