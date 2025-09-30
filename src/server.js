// server.js
import express from "express";
import rotasLivros from "./routes/books.js";
import rotasAuth from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use("/auth", rotasAuth);
app.use("/books", rotasLivros);

app.get("/", (req, res) => {
  res.send("API rodando!");
});

app.listen(3000);