import { PrismaClient } from "@prisma/client";
const prismaDB = new PrismaClient();

export async function ListarLivros(req, res) {
  const allLivros = await prismaDB.livro.findMany();
  res.json(allLivros);
}

export async function pegar1Livro(req, res) {
  const livroId = parseInt(req.params.id);
  const livroEncontrado = await prismaDB.livro.findUnique({ where: { id: livroId } });

  if (!livroEncontrado) return res.status(404).json({ msg: "Livro não encontrado" });

  res.json(livroEncontrado);
}

export async function CriarLivro(req, res) {
  const dados = req.body;
  const { title, author } = dados;

  if (!title || !author) return res.status(400).json({ msg: "Title e author obrigatórios" });

  const livroNovo = await prismaDB.livro.create({ data: { title, author } });

  res.status(201).json({ msg: "Livro criado", book: livroNovo });
}

export async function atualizarLivro(req, res) {
  const livroId = parseInt(req.params.id);
  const { title, author, available } = req.body;

  const livroAtual = await prismaDB.livro.update({
    where: { id: livroId },
    data: { title, author, available },
  });

  res.json({ msg: "Livro atualizado", book: livroAtual });
}

export async function deletarLivro(req, res) {
  const livroId = parseInt(req.params.id);
  await prismaDB.livro.delete({ where: { id: livroId } });

  res.json({ msg: "Livro deletado" });
}

export async function pegarLivro(req, res) {
  const livroId = parseInt(req.params.id);
  const livroCheck = await prismaDB.livro.findUnique({ where: { id: livroId } });

  if (!livroCheck) return res.status(404).json({ msg: "não achei o livro" });
  if (!livroCheck.available) return res.status(400).json({ msg: "num da pra pegar não, ta indisponivel" });

  await prismaDB.livro.update({ where: { id: livroId }, data: { available: false } });

  res.json({ msg: "Livro emprestado" });
}

export async function devolverLivro(req, res) {
  const livroId = parseInt(req.params.id);
  const livroCheck = await prismaDB.livro.findUnique({ where: { id: livroId } });

  if (!livroCheck) return res.status(404).json({ msg: "não achei o livro" });

  await prismaDB.livro.update({ where: { id: livroId }, data: { available: true } });

  res.json({ msg: "Livro devolvido" });
}




//Admin: usuario1:1234 → Base64 → dXN1YXJpbzE6MTIzNDU=
//Comum: tayla:1234 → Base64 → dGF5bGE6MTIzNA==
//Comum: rafael:1234 → Base64 → cmFmYWVsOjEyMzQ=