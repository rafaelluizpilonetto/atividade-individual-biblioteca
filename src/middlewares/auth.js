import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Basic ")) return res.status(401).json({ msg: "cade o token?" });

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
  const user = await prisma.usuario.findFirst({ where: { username, password } });
  if (!user) return res.status(401).json({ msg: "Usuário ou senha inválidos" });

  req.user = user;
  next();
}
export function isAdmin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).json({ msg: "aqui é só pros adm, acesso negado irmão" });
  next();
}
