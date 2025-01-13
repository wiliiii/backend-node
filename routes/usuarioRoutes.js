const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/usuarios', verifyToken, usuarioController.getUsuarios);
router.get('/usuarios/:id', verifyToken, usuarioController.getUsuarioById);
router.post('/usuarios', usuarioController.createUsuario);
router.put('/usuarios/:id', verifyToken, usuarioController.updateUsuario);

module.exports = router;
