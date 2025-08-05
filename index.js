const express = require('express');
const app = express();
const livroRoutes = require('./src/modules/Livro/router/livroRoute');

app.use(express.json());


app.use('/livros', livroRoutes);

app.use((req, res, next) => {
  res.status(404).json({ msg: 'Rota não encontrada' });
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
