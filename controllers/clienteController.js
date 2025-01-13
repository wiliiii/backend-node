const pool = require('../config/database');

// Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cliente');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un cliente por ID
const getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM cliente WHERE cliente_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo cliente
const createCliente = async (req, res) => {
    const { cliente_nombre, cliente_apellido, cliente_email, cliente_telefono } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO cliente (cliente_nombre, cliente_apellido, cliente_email, cliente_telefono) VALUES (?, ?, ?, ?)',
            [cliente_nombre, cliente_apellido, cliente_email, cliente_telefono]
        );
        res.status(201).json({ id: result.insertId, message: 'Cliente creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un cliente existente
const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { cliente_nombre, cliente_apellido, cliente_email, cliente_telefono } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE cliente SET cliente_nombre = ?, cliente_apellido = ?, cliente_email = ?, cliente_telefono = ? WHERE cliente_id = ?',
            [cliente_nombre, cliente_apellido, cliente_email, cliente_telefono, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un cliente
const deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM cliente WHERE cliente_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};
