const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
    producto_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    producto_codigo: {
        type: DataTypes.STRING(77),
        allowNull: false,
    },
    producto_nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    producto_stock_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    producto_tipo_unidad: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    producto_precio_compra: {
        type: DataTypes.DECIMAL(30, 2),
        allowNull: false,
    },
    producto_precio_venta: {
        type: DataTypes.DECIMAL(30, 2),
        allowNull: false,
    },
    producto_marca: {
        type: DataTypes.STRING(35),
        allowNull: false,
    },
    producto_modelo: {
        type: DataTypes.STRING(35),
        allowNull: false,
    },
    producto_estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    producto_foto: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categoria',
            key: 'categoria_id',
        },
        allowNull: false,
    },
}, {
    tableName: 'producto',
    timestamps: false,
});

module.exports = Producto;
