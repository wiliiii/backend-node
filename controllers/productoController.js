const pool = require('../config/database');

// Obtener todos los productos
const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM producto');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un producto por ID
const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM producto WHERE producto_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
    const { producto_nombre, producto_precio, producto_stock } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO producto (producto_nombre, producto_precio, producto_stock) VALUES (?, ?, ?)',
            [producto_nombre, producto_precio, producto_stock]
        );
        res.status(201).json({ id: result.insertId, message: 'Producto creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un producto existente
const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { producto_nombre, producto_precio, producto_stock } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE producto SET producto_nombre = ?, producto_precio = ?, producto_stock = ? WHERE producto_id = ?',
            [producto_nombre, producto_precio, producto_stock, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM producto WHERE producto_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};
