const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
    cliente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cliente_tipo_documento: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    cliente_numero_documento: {
        type: DataTypes.STRING(35),
        allowNull: false,
    },
    cliente_nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    cliente_apellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    cliente_provincia: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    cliente_ciudad: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    cliente_direccion: {
        type: DataTypes.STRING(70),
        allowNull: false,
    },
    cliente_telefono: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    cliente_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: 'cliente',
    timestamps: false,
});

module.exports = Cliente;