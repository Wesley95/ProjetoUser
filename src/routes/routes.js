const express = require('express');
const UsuarioController = require('../controllers/usuarioControllers.js');
const ProdutoController = require('../controllers/produtosControllers.js');
const router = express.Router();

router.post('/usuarios', UsuarioController.Insert);
router.get('/usuarios', UsuarioController.SelectAll);
router.get('/usuarios/:id', UsuarioController.SelectDetail);
router.put('/usuarios/:id', UsuarioController.Update);
router.delete('/usuarios/:id', UsuarioController.Delete);

router.post('/produtos', ProdutoController.Insert);
router.get('/produtos/:id', ProdutoController.SelectDetail);
router.get('/produtos', ProdutoController.SelectAll);
router.delete('/produtos/:id', ProdutoController.Delete);

module.exports = router;
