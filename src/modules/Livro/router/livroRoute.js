const express = require('express');
const router = express.Router();
const LivroController = require('../controllers/livroController');


router.post('/', LivroController.criar);
router.get('/', LivroController.listar);
//router.get('/busca', LivroController.buscarLivroPorTitulo);
//router.get('/:id', LivroController.buscarLivroId);
router.put('/:id', LivroController.atualizar);
router.delete('/:id', LivroController.remover);

module.exports = router;

































