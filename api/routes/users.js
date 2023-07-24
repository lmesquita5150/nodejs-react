import express from "express";
//IMPORTADO AS CONSTANTES DO CONTROLLER
import { getUsers, addUsers, updateUsers, deleteUsers } from "../controller/user.js";

const router = express.Router();

//CRIANDO AS ROTAS 

router.get("/", getUsers);
router.post("/", addUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;