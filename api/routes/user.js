import  express  from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../helpers/verifyToken.js";

const router = express.Router();

//Get all records
router.get("/", verifyAdmin ,getAllUsers);

//Get specific record
router.get("/:id", verifyUser, getUserById);

export default router;