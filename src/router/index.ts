import { Router } from "express";
import CategoryRoute from "./category";
import Authrouter from "./auth";
const router = Router();
const routerlist = [CategoryRoute, Authrouter];
router.use("/api", routerlist);

export default router;
