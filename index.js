const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const cajaRoutes = require('./routes/cajaRoutes');
const ventaRoutes = require('./routes/ventaRoutes');
const ventaDetalleRoutes = require('./routes/ventaDetalleRoutes');
const productoRoutes = require('./routes/productoRoutes');
const rolRoutes = require('./routes/rolRoutes');

const { verifyToken } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes'); // Ruta de autenticación
// Importar rutas
// Ejemplo: const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api/usuarios', verifyToken, usuarioRoutes);
app.use('/api/categorias', verifyToken, categoriaRoutes);
app.use('/api/clientes', verifyToken, clienteRoutes);
app.use('/api/cajas', verifyToken, cajaRoutes);
app.use('/api/ventas', verifyToken, ventaRoutes);
app.use('/api/venta-detalles', verifyToken, ventaDetalleRoutes);
app.use('/api/productos', verifyToken, productoRoutes);
app.use('/api/roles', verifyToken, rolRoutes);

// Probar conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch((error) => console.error('Error al conectar con la base de datos:', error));
  sequelize.sync().then(() => console.log('Modelos sincronizados con la base de datos.'));

// Rutas principales
// Ejemplo: app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
