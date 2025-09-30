import { PrismaClient } from "@prisma/client";
const database = new PrismaClient();

export async function criarUsuario(req, res) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ msg: "O nome e senha é obrigatorio cara" });
  }

  if (password.length < 4) {
    return res.status(400).json({ msg: "essa senha ai? no minimo quatro caracteres meu" });
  }

  const usuarioExistente = await database.usuario.findFirst({ 
    where: { username } 
  });

  if (usuarioExistente) {
    return res.status(400).json({ msg: "Esse teu nome já existe" });
  }

  const qtdUsuarios = await database.usuario.count();
  const admin = qtdUsuarios === 0;

  const novoUsuario = await database.usuario.create({
    data: { username, password, isAdmin: admin }
  });

  res.status(201).json({ 
    msg: "Nomezin criado", 
    userId: novoUsuario.id 
  });
}