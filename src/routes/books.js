import express from "express";
import {
  ListarLivros,
  pegar1Livro,
  CriarLivro,
  atualizarLivro,
  deletarLivro,
  pegarLivro,
  devolverLivro,
} from "../controller/books.js";

import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router();

// Usuário comum
router.get("/", auth, ListarLivros);
router.get("/:id", auth, pegar1Livro);
router.post("/:id/borrow", auth, pegarLivro);
router.post("/:id/return", auth, devolverLivro);

// Admin
router.post("/", auth, isAdmin, CriarLivro);
router.patch("/:id", auth, isAdmin, atualizarLivro);
router.delete("/:id", auth, isAdmin, deletarLivro);

export default router;
