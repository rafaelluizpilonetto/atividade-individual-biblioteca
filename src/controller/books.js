import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function buscarTodosLivros(req, res) {
  try {
    const todosLivros = await db.livro.findMany();
    res.json(todosLivros);
  } catch (error) {
    res.status(500).json({erro: "deu ruim"})
  }
}

export async function buscarLivroPorId(req, res) {
  const idLivro = Number(req.params.id);
  
  const livro = await db.livro.findUnique({
    where: { id: idLivro }
  });

  if (!livro) {
    return res.status(404).json({message: "Livro não existe"});
  }

  res.json(livro);
}

export async function criarNovoLivro(req, res) {
  const { title, author } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({error: "Precisa do title"});
  }
  if (!author || author.trim() === "") {
    return res.status(400).json({error: "Precisa do author"});
  }

  const livroCriado = await db.livro.create({
    data: { title, author }
  });

  res.status(201).json({
    message: "Livro criado com sucesso",
    livro: livroCriado
  });
}

export async function modificarLivro(req, res) {
  const id = parseInt(req.params.id);
  const { title, author, available } = req.body;

  try {
    const livroModificado = await db.livro.update({
      where: { id: id },
      data: { title, author, available }
    });
    
    res.json({ msg: "Atualizado", livro: livroModificado });
  } catch (err) {
    res.status(404).json({error: "Não encontrado"});
  }
}

export async function excluirLivro(req, res) {
  const idLivro = parseInt(req.params.id);
  
  await db.livro.delete({ where: { id: idLivro } });

  res.json({message: "Livro apagado"});
}

export async function emprestarLivro(req, res) {
  const id = Number(req.params.id);
  
  const livro = await db.livro.findUnique({ where: { id: id } });

  if (!livro) {
    return res.status(404).json({erro: "Livro não encontrado kirido"});
  }

  if (!livro.available) {
    return res.status(400).json({erro: "Livro já  ta emprestado mano"});
  }

  await db.livro.update({
    where: { id: id },
    data: { available: false }
  });

  res.json({message: " livro foi emprestado boa leituraaaaaaaaaaaa irmão"});
}

export async function devolverLivro(req, res) {
  const idLivro = parseInt(req.params.id);
  
  const livro = await db.livro.findUnique({ where: { id: idLivro } });

  if (!livro) {
    return res.status(404).json({erro: "Não achei carinha"});
  }

  await db.livro.update({
    where: { id: idLivro },
    data: { available: true }
  });

  res.json({message: "Devolvido meu brodeeer"});
}