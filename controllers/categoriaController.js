const pool = require('../config/database');

// Obtener todas las categorías
const getCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categoria');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener una categoría por ID
const getCategoriaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM categoria WHERE categoria_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear una nueva categoría
const createCategoria = async (req, res) => {
    const { categoria_nombre, categoria_descripcion } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO categoria (categoria_nombre, categoria_descripcion) VALUES (?, ?)',
            [categoria_nombre, categoria_descripcion]
        );
        res.status(201).json({ id: result.insertId, message: 'Categoría creada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar una categoría existente
const updateCategoria = async (req, res) => {
    const { id } = req.params;
    const { categoria_nombre, categoria_descripcion } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE categoria SET categoria_nombre = ?, categoria_descripcion = ? WHERE categoria_id = ?',
            [categoria_nombre, categoria_descripcion, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría actualizada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar una categoría
const deleteCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM categoria WHERE categoria_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría eliminada exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
};
