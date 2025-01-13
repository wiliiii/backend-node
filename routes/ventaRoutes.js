const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const { verifyToken } = require('../middleware/authMiddleware');


router.get('/ventas', verifyToken, ventaController.getVentas);
router.get('/ventas/:id', verifyToken, ventaController.getVentaById);
router.post('/ventas', verifyToken, ventaController.createVenta);
router.put('/ventas/:id', verifyToken, ventaController.updateVenta);
router.delete('/ventas/:id', verifyToken, ventaController.deleteVenta);

module.exports = router;
