const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { verifyToken } = require('../middleware/authMiddleware');


router.get('/clientes', verifyToken, clienteController.getClientes);
router.get('/clientes/:id', verifyToken, clienteController.getClienteById);
router.post('/clientes', verifyToken, clienteController.createCliente);
router.put('/clientes/:id', verifyToken, clienteController.updateCliente);
router.delete('/clientes/:id', verifyToken, clienteController.deleteCliente);

module.exports = router;
