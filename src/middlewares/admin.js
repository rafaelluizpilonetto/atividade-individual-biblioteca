
export function isAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ msg: "vc não tem acesso não meu parceiro, se liga" });
  }
  next();
}


