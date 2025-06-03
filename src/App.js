import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false); 

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    return newPassword;
  };

  const handleGeneratePassword = async () => {
    const newPassword = generatePassword();
    setPassword(newPassword);

    try {
      await axios.post('http://localhost:3001/save', { password: newPassword });
      console.log('Senha salva com sucesso no back-end');
    } catch (error) {
      console.error('Erro ao salvar senha no servidor:', error);
    }
  };

  // Função para copiar a senha ao clicar
  const handleCopyPassword = () => {
    if (!password) return;

    navigator.clipboard.writeText(password)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500); // some após 2,5s
      })
      .catch((err) => console.error('Erro ao copiar:', err));
  };

  //Ao clicar gera senha aleatória
  return (
    <div className="container">
      <h1>Gerador de Senhas</h1>

      <button onClick={handleGeneratePassword}>Gerar Senha</button>

      {password && (
        <div className="password-box" onClick={handleCopyPassword}>
          <p><strong>Senha Gerada:</strong></p>
          <p className="generated-password">{password}</p>
        </div>
      )}

      {copied && <p style={{ marginTop: '1rem', color: '#90ee90' }}>Senha copiada!</p>}
    </div>
  );
}

export default App;