import { Router } from "express";
import Controller from "../controller/auth";
import { isLogin } from "../middleware/error/authorization/auth";
// import { isLogin } from "../middleware/authorization/islogin";
const router = Router();

router.post("/auth/register", Controller.register);
router.post("/auth/check", isLogin(["admin", "user"], false), Controller.check);
router.post("/auth/activate", isLogin(["user"], false), Controller.verify);
// router.post("/auth/login", Controller.LOGIN);

export default router;
