const pool = require('../config/database');

// Obtener todos los detalles de venta
const getVentaDetalles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM venta_detalle');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un detalle de venta por ID
const getVentaDetalleById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM venta_detalle WHERE venta_detalle_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Detalle de venta no encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo detalle de venta
const createVentaDetalle = async (req, res) => {
    const { venta_id, producto_id, cantidad, precio } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO venta_detalle (venta_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)',
            [venta_id, producto_id, cantidad, precio]
        );
        res.status(201).json({ id: result.insertId, message: 'Detalle de venta creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un detalle de venta existente
const updateVentaDetalle = async (req, res) => {
    const { id } = req.params;
    const { venta_id, producto_id, cantidad, precio } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE venta_detalle SET venta_id = ?, producto_id = ?, cantidad = ?, precio = ? WHERE venta_detalle_id = ?',
            [venta_id, producto_id, cantidad, precio, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Detalle de venta no encontrado' });
        }
        res.json({ message: 'Detalle de venta actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un detalle de venta
const deleteVentaDetalle = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM venta_detalle WHERE venta_detalle_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Detalle de venta no encontrado' });
        }
        res.json({ message: 'Detalle de venta eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getVentaDetalles,
    getVentaDetalleById,
    createVentaDetalle,
    updateVentaDetalle,
    deleteVentaDetalle
};
