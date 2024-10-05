import express from "express";
import Role from "../models/Role.js";
import { createRole, deleteRole, getAllRoles, updateRole } from "../controllers/role.controller.js";
import { verifyAdmin } from "../helpers/verifyToken.js";

const router = express.Router();

//create a new role in DB
router.post('/create', verifyAdmin, createRole)

//update role in DB
router.put("/update/:id",verifyAdmin, updateRole)

//Get all roles from DB
router.get("/getAll",getAllRoles)

//delete role from db
router.delete("/delete/:id", deleteRole)

export default router;