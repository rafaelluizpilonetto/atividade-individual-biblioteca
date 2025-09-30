// src/routes/auth.js
import express from "express";
import { register } from "../controller/user.js";

const router = express.Router();

// Rota para registrar usuário
router.post("/register", register);

export default router;
