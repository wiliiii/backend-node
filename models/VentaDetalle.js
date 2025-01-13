const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración

const VentaDetalle = sequelize.define('VentaDetalle', {
    venta_detalle_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    venta_detalle_cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    venta_detalle_precio: {
        type: DataTypes.DECIMAL(30, 2),
        allowNull: false,
    },
    venta_detalle_subtotal: {
        type: DataTypes.DECIMAL(30, 2),
        allowNull: false,
    },
    venta_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'venta',
            key: 'venta_id',
        },
        allowNull: false,
    },
    producto_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'producto',
            key: 'producto_id',
        },
        allowNull: false,
    },
}, {
    tableName: 'venta_detalle',
    timestamps: false,
});

// Definimos la relación con la venta y el producto
VentaDetalle.belongsTo(require('./Venta'), { foreignKey: 'venta_id' });
VentaDetalle.belongsTo(require('./Producto'), { foreignKey: 'producto_id' });

module.exports = VentaDetalle;
