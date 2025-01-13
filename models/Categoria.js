// models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
    categoria_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoria_nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    categoria_ubicacion: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
}, {
    tableName: 'categoria',
    timestamps: false,
});

module.exports = Categoria;