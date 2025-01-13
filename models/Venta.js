const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Venta = sequelize.define('Venta', {
    venta_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    venta_codigo: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
    },
    venta_fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    venta_hora: {
        type: DataTypes.STRING(17),
        allowNull: false,
    },
    venta_total: {
        type: DataTypes.DECIMAL(30, 2),
        allowNull: false,
    },
    venta_pagado: {
        type: DataTypes.DECIMAL(30, 2),
        allowNull: false,
    },
    venta_cambio: {
        type: DataTypes.DECIMAL(30, 2),
        allowNull: false,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario',
            key: 'usuario_id',
        },
        allowNull: false,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cliente',
            key: 'cliente_id',
        },
        allowNull: false,
    },
    caja_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'caja',
            key: 'caja_id',
        },
        allowNull: false,
    },
}, {
    tableName: 'venta',
    timestamps: false,
});

// Definimos las relaciones
Venta.belongsTo(require('./Usuario'), { foreignKey: 'usuario_id' });
Venta.belongsTo(require('./Cliente'), { foreignKey: 'cliente_id' });
Venta.belongsTo(require('./Caja'), { foreignKey: 'caja_id' });

module.exports = Venta;

