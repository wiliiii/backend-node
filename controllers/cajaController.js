// controllers/cajaController.js
const pool = require('../config/database');

exports.getAllCajas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM caja');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCajaById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM caja WHERE caja_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Caja not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCaja = async (req, res) => {
    try {
        const { caja_numero, caja_nombre, caja_efectivo } = req.body;
        const [result] = await pool.query('INSERT INTO caja (caja_numero, caja_nombre, caja_efectivo) VALUES (?, ?, ?)', [caja_numero, caja_nombre, caja_efectivo]);
        res.status(201).json({ id: result.insertId, caja_numero, caja_nombre, caja_efectivo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCaja = async (req, res) => {
    try {
        const { id } = req.params;
        const { caja_numero, caja_nombre, caja_efectivo } = req.body;
        const [result] = await pool.query('UPDATE caja SET caja_numero = ?, caja_nombre = ?, caja_efectivo = ? WHERE caja_id = ?', [caja_numero, caja_nombre, caja_efectivo, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Caja not found' });
        }
        res.json({ id, caja_numero, caja_nombre, caja_efectivo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCaja = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM caja WHERE caja_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Caja not found' });
        }
        res.json({ message: 'Caja deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
