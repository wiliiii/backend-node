const pool = require('../config/database');

// Obtener todos los roles
const getRoles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rol');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un rol por ID
const getRolById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM rol WHERE id_rol = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo rol
const createRol = async (req, res) => {
    const { descripcion } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO rol (descripcion) VALUES (?)',
            [descripcion]
        );
        res.status(201).json({ id: result.insertId, message: 'Rol creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un rol existente
const updateRol = async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE rol SET descripcion = ? WHERE id_rol = ?',
            [descripcion, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json({ message: 'Rol actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un rol
const deleteRol = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM rol WHERE id_rol = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json({ message: 'Rol eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
};
