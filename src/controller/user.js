import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function register(req, res) {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ msg: "O nome e senha é obrigatorio cara" });
  if (password.length < 4)
    return res.status(400).json({ msg: "essa senha ai? no minimo quatro caracteres meu" });

  const existingUser = await prisma.usuario.findFirst({ where: { username } });
  if (existingUser) return res.status(400).json({ msg: "Esse teu nome já existe" });

  const isFirstUser = (await prisma.usuario.count()) === 0;
  const newUser = await prisma.usuario.create({
    data: { username, password, isAdmin: isFirstUser },
  });

  res.status(201).json({ msg: "Nomezin criado", userId: newUser.id });
}
