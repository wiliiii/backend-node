const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const { verifyToken } = require('../middleware/authMiddleware');


router.get('/roles', verifyToken, rolController.getRoles);
router.get('/roles/:id', verifyToken, rolController.getRolById);
router.post('/roles', verifyToken, rolController.createRol);
router.put('/roles/:id', verifyToken, rolController.updateRol);
router.delete('/roles/:id', verifyToken, rolController.deleteRol);

module.exports = router;

