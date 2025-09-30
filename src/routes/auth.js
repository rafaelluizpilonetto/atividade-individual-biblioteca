
import express from "express";
import { criarUsuario } from "../controller/user.js";

const roteador = express.Router();

roteador.post("/register", criarUsuario);

export default roteador;