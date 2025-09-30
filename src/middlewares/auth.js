import { PrismaClient } from "@prisma/client";
const prismaDB = new PrismaClient();

export async function autenticar(req, res, next) {
  const auth = req.headers.authorization;
  
  if (!auth?.startsWith("Basic ")) {
    return res.status(401).json({ msg: "cade o token?" });
  }

  const credenciais = Buffer.from(auth.split(" ")[1], "base64").toString().split(":");
  const username = credenciais[0];
  const password = credenciais[1];

  const usuario = await prismaDB.usuario.findFirst({ 
    where: { username, password } 
  });
  
  if (!usuario) 
    return res.status(401).json({ msg: "Usuário ou senha inválidos" });

  req.user = usuario;
  next();
}