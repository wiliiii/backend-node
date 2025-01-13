const express = require('express');
const router = express.Router();
const ventaDetalleController = require('../controllers/ventaDetalleController');
const { verifyToken } = require('../middleware/authMiddleware');


router.get('/venta_detalles', verifyToken, ventaDetalleController.getVentaDetalles);
router.get('/venta_detalles/:id', verifyToken, ventaDetalleController.getVentaDetalleById);
router.post('/venta_detalles', verifyToken, ventaDetalleController.createVentaDetalle);
router.put('/venta_detalles/:id', verifyToken, ventaDetalleController.updateVentaDetalle);
router.delete('/venta_detalles/:id', verifyToken, ventaDetalleController.deleteVentaDetalle);

module.exports = router;
