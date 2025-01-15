import { Router } from "express";
import { registerUser,getAllUsers } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/users").get(getAllUsers);


export default router;
