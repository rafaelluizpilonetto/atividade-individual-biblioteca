// books.js (routes)
import express from "express";
import { 
  buscarTodosLivros, 
  buscarLivroPorId, 
  criarNovoLivro, 
  modificarLivro, 
  excluirLivro, 
  emprestarLivro, 
  devolverLivro 
} from "../controller/books.js";

import { autenticar } from "../middlewares/auth.js";
import { verificarAdmin } from "../middlewares/admin.js";

const rotas = express.Router();

rotas.get("/", autenticar, buscarTodosLivros);
rotas.get("/:id", autenticar, buscarLivroPorId);
rotas.post("/:id/borrow", autenticar, emprestarLivro);
rotas.post("/:id/return", autenticar, devolverLivro);

rotas.post("/", autenticar, verificarAdmin, criarNovoLivro);
rotas.patch("/:id", autenticar, verificarAdmin, modificarLivro);
rotas.delete("/:id", autenticar, verificarAdmin, excluirLivro);

export default rotas;