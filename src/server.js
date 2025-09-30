import express from "express";
import booksRoutes from "./routes/books.js";
import authRoutes from "./routes/auth.js";



const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/books", booksRoutes);

app.get("/", (req, res) => res.send("API rodando!"));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
