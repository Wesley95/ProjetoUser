const express = require('express');
const UsuarioController = require('../controllers/usuarioControllers.js');
const ProdutoController = require('../controllers/produtosControllers.js');
const UsuarioPedidoController = require('../controllers/usuarioPedidoControllers.js');
const router = express.Router();

router.post('/usuarios', UsuarioController.Insert);
router.get('/usuarios', UsuarioController.SelectAll);
router.get('/usuarios/:id', UsuarioController.SelectDetail);
router.put('/usuarios/:id', UsuarioController.Update);
router.delete('/usuarios/:id', UsuarioController.Delete);

router.post('/produtos', ProdutoController.Insert);
router.get('/produtos/:id', ProdutoController.SelectDetail);
router.get('/produtos', ProdutoController.SelectAll);
router.put('/produtos/:id', ProdutoController.Update);

router.post('/pedidos', UsuarioPedidoController.Insert);
router.get('/pedidos', UsuarioPedidoController.SelectAll);

module.exports = router;
