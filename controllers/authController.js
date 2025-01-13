const pool = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { usuario_usuario, usuario_clave } = req.body;

    if (!usuario_usuario || !usuario_clave) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
    }

    try {
        // Buscar usuario en la base de datos
        const [rows] = await pool.query('SELECT * FROM usuario WHERE usuario_usuario = "' + usuario_usuario + '"');
        console.log(rows);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        const usuario = rows[0];

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(usuario_clave, usuario.usuario_clave);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Generar JWT
        const token = jwt.sign(
            { usuario_id: usuario.usuario_id, usuario_usuario: usuario.usuario_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // El token expirará en 1 hora
        );

        res.json({ message: 'Login exitoso', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { login };
