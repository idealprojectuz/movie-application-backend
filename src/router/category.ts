import { Router } from "express";
import Controller from "../controller/category";
const router = Router();

router.get("/category", Controller.GET);

export default router;
