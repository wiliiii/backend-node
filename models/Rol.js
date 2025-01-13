const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rol = sequelize.define('Rol', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'rol',
    timestamps: false,
});

module.exports = Rol;
