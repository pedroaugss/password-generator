// Import dos modulos 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

// Cria o app Express
const app = express();
const PORT = 3001; // Porta do servidor

// Middlewares permite receber e enviar JSON e liberar o acesso externo
app.use(cors());
app.use(bodyParser.json());

// Endpoint (Salva a senha gerada)
app.post('/save-password', (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Senha não fornecida.' });
    }

    // Salva a senha ao arquivo local 
    fs.appendFile('passwords.txt', password + '\n', (err) => {
        if (err) {
            console.error('Erro ao salvar a senha:', err);
            return res.status(500).json({ message: 'Erro ao salvar a senha.' });
        }

        res.status(200).json({ message: 'Senha salva com sucesso!' });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});