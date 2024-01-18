const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const temporaryTokens = {};

// Configuração do banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projectUsers",
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conexão bem-sucedida ao banco de dados MySQL");
  }
});

// Rotas
app.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  // Hash da senha usando bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // SQL para inserir usuário no banco de dados
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const values = [username, email, hashedPassword];

  // Executa a query usando a variável 'db' ao invés de 'connection'
  db.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Erro ao registrar usuário." });
    } else {
      // Gere um token de autenticação para o novo usuário
      const token = jwt.sign(
        { id: results.insertId, email },
        "jsdfnkjouittms",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        success: true,
        message: "Usuário registrado com sucesso.",
        token,
      });
    }
  });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário no banco de dados
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Erro ao fazer login:", err);
          res.status(500).json({ success: false, message: "Erro interno" });
        } else if (results.length > 0) {
          const user = results[0];
          const match = await bcrypt.compare(password, user.password);

          if (match) {
            // Gerar token de autenticação
            const token = jwt.sign(
              { id: user.id, email: user.email },
              "jsdfnkjouittms",
              {
                expiresIn: "1h",
              }
            );

            res.status(200).json({ success: true, token });
          } else {
            res
              .status(401)
              .json({ success: false, message: "Credenciais inválidas" });
          }
        } else {
          res
            .status(404)
            .json({ success: false, message: "Usuário não encontrado" });
        }
      }
    );
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ success: false, message: "Erro interno" });
  }
});

app.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Geração do token de redefinição de senha
    const token = jwt.sign({ email }, "asdfnlsklpo", { expiresIn: "1h" });

    temporaryTokens[email] = token;

    // Lógica para enviar e-mail com o link contendo o token
    const resetLink = `http://localhost:5173/resetpassword/${token}`;
    console.log(process.env.SECRET_PASSWORD);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SECRET_EMAIL,
        pass: process.env.SECRET_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SECRET_EMAIL,
      to: email,
      subject: "Recuperação de Senha",
      text: `Clique no link para redefinir sua senha: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erro ao enviar e-mail:", error);
        res
          .status(500)
          .json({ success: false, message: "Erro ao enviar e-mail" });
      } else {
        console.log("E-mail enviado:", info.response);
        res
          .status(200)
          .json({ success: true, message: "E-mail enviado com sucesso" });
      }
    });
  } catch (error) {
    console.error("Erro na recuperação de senha:", error);
    res.status(500).json({ success: false, message: "Erro interno" });
  }
});

app.post("/togglepassword", async (req, res) => {
  try {
    const { token, password } = req.body;

    const email = Object.keys(temporaryTokens);
    const tokenValue = Object.values(temporaryTokens);

    if (!token) {
      console.log("Token ausente:", token);
      return res.status(400).json({ status: 400, message: "Token ausente" });
    }

    if (!tokenValue) {
      console.log("Token não encontrado em temporaryTokens:", token);
      return res
        .status(400)
        .json({ status: 400, message: "Token não encontrado" });
    }

    // Lógica para atualizar a senha no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL para atualizar a senha do usuário
    const updateSql = "UPDATE users SET password = ? WHERE email = ?";
    const updateValues = [hashedPassword, email];

    db.query(updateSql, updateValues, (error, results, fields) => {
      if (error) {
        console.error("Erro ao atualizar a senha:", error);
        return res.status(500).json({ status: 500, message: "Erro interno" });
      }

      if (results) {
        console.log("Result: " + JSON.stringify(results));
      }

      // Remova o token temporário após a atualização da senha
      delete temporaryTokens[0];

      res
        .status(200)
        .json({ status: 200, message: "Senha alterada com sucesso" });
    });
  } catch (error) {
    console.error("Erro durante a alteração da senha:", error);
    res.status(500).json({ status: 500, message: "Erro interno" });
  }
});

const tokenBlacklist = new Set();

// Rota de Logout
app.post("/logout", (req, res) => {
  try {
    const { session_token } = req.body;

    // Verifica se o token está na lista negra
    if (tokenBlacklist.has(session_token)) {
      res.status(401).json({ success: false, message: "Token inválido." });
    } else {
      // Adiciona o token à lista negra (revoga o token)
      tokenBlacklist.add(session_token);
      res.status(200).json({ success: true, message: "Logout bem-sucedido." });
    }
  } catch (error) {
    console.error("Erro durante o logout:", error);
    res.status(500).json({ success: false, message: "Erro interno" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
