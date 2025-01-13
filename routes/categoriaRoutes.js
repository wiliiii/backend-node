const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { verifyToken } = require('../middleware/authMiddleware');


router.get('/categorias', verifyToken, categoriaController.getCategorias);
router.get('/categorias/:id', verifyToken, categoriaController.getCategoriaById);
router.post('/categorias', verifyToken, categoriaController.createCategoria);
router.put('/categorias/:id', verifyToken, categoriaController.updateCategoria);
router.delete('/categorias/:id', verifyToken, categoriaController.deleteCategoria);

module.exports = router;
