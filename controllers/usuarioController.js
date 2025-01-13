const pool = require('../config/database');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE usuario_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
    const { usuario_nombre, usuario_apellido, usuario_email, usuario_usuario, usuario_clave, usuario_foto, caja_id, rol_usuario } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuario (usuario_nombre, usuario_apellido, usuario_email, usuario_usuario, usuario_clave, usuario_foto, caja_id, rol_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [usuario_nombre, usuario_apellido, usuario_email, usuario_usuario, usuario_clave, usuario_foto, caja_id, rol_usuario]
        );
        res.status(201).json({ id: result.insertId, message: 'Usuario creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un usuario existente
const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { usuario_nombre, usuario_apellido, usuario_email, usuario_usuario, usuario_clave, usuario_foto, caja_id, rol_usuario } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuario SET usuario_nombre = ?, usuario_apellido = ?, usuario_email = ?, usuario_usuario = ?, usuario_clave = ?, usuario_foto = ?, caja_id = ?, rol_usuario = ? WHERE usuario_id = ?',
            [usuario_nombre, usuario_apellido, usuario_email, usuario_usuario, usuario_clave, usuario_foto, caja_id, rol_usuario, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM usuario WHERE usuario_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
